package web

import (
	"bbs/config"
	"bbs/controllers/public"
	"bbs/db"
	"bbs/libraries"
	"bbs/models"
	"bbs/protocol"
	"bbs/server"
	"image"
	"io"
	"math/rand"
	"os"
	"strconv"
	"strings"
	"sync"
	"sync/atomic"
	"time"

	"github.com/rubenfonseca/fastimage"
	"golang.org/x/image/bmp"
	"golang.org/x/image/webp"
)

var uploadbufpool = sync.Pool{
	New: func() interface{} {
		return &libraries.MsgBuffer{}
	},
}

func upload_image(data *protocol.MSG_U2WS_upload_image, c *server.Context) {
	user := public.Getuserinfo(c)
	if user.Uid == 0 {
		c.Out_common(protocol.Err_Notlogin, "")
		return
	}
	if !user.Group.Allowpostimage {
		c.Out_common(protocol.Err_Groupperm, "")
		return
	}
	if user.Group.Maxattachnum > 0 {
		if user.Group.Maxattachnum-user.Count.Todayattachs <= 0 {
			c.Out_common(protocol.Err_NotEnoughAttachs, "")
			return
		}
	}
	if user.Group.Maxsizeperday > 0 {
		if user.Group.Maxsizeperday-user.Count.Todayattachsize <= 0 {
			c.Out_common(protocol.Err_NotEnoughAttachsize, "")
			return
		}
	}

	imagetype, size, err := getimageTypeAndSizefastimage(data.Data)
	if err != nil || size == nil {
		c.Out_common(protocol.Err_Imgtype, "")
		return
	}

	ext := "gif"
	if imagetype != fastimage.GIF {
		if config.Server.Webp {
			ext = "webp"
			err, data.Data = libraries.ConvertImgFromFastimage(data.Data, size, imagetype, "webp", 1, 1, 75)
		} else {
			ext = "jpg"
			err, data.Data = libraries.ConvertImgFromFastimage(data.Data, size, imagetype, "jpg", 1, 1, 75)
		}
		if err != nil {
			c.Adderr(err, nil)
			c.Out_common(protocol.Fail, "")
			return
		}
	}
	filename := getImgFilename(c, user, ext)

	f := strings.Replace(filename, "./static", "", 1)
	insert := &db.Forum_attachment{
		Uid:        user.Uid,
		Dateline:   int32(time.Now().Unix()),
		Filename:   data.Filename,
		Filesize:   int32(len(data.Data)),
		Attachment: f,
		Isimage:    true,
		Width:      int16(size.Width),
	}
	if config.Server.OssEndpoint != "" {
		insert.Attachment = config.Server.OSSUrl + insert.Attachment
	}
	model_attach := &models.Model_forum_attachment{}
	model_attach.Ctx = c
	model_attach.BeginTransaction()
	defer model_attach.EndTransaction()
	model_attach.Ctx = c
	aid := model_attach.Add(insert)
	if aid == 0 {
		model_attach.Rollback()
		c.Out_common(protocol.Err_db, "")
		return
	}
	if code, err := saveUpload("", filename, data.Data); code != protocol.Success || err != nil {
		c.Out_common(code, "")
		model_attach.Rollback()
		c.Adderr(err, nil)
		return
	}
	model_attach.Commit()
	insert.Aid = aid
	msg := protocol.Pool_MSG_WS2U_upload_image.Get().(*protocol.MSG_WS2U_upload_image)
	msg.Img = insert.Attachment
	msg.Aid = aid
	msg.Title = data.Filename

	c.Output_data(msg)
	msg.Put()
	user.Count.Addattachsize(int32(len(data.Data)))
}
func delete_image(data *protocol.MSG_U2WS_delete_attach, c *server.Context) {
	user := public.Getuserinfo(c)
	if user.Uid == 0 {
		c.Out_common(protocol.Err_Notlogin, "")
		return
	}
	if len(data.Ids) == 0 {
		c.Out_common(protocol.Err_param, "")
		return
	}

	model_attach := &models.Model_forum_attachment{}
	model_attach.Ctx = c
	attachs := model_attach.GetAttachmentlist(map[string]interface{}{"Aid": []interface{}{"in", data.Ids}, "Uid": user.Uid})
	msg := protocol.Pool_MSG_WS2U_delete_attach.Get().(*protocol.MSG_WS2U_delete_attach)
	msg.Ids = nil
	for _, img := range attachs {
		res := model_attach.Delete(map[string]interface{}{"Aid": img.Aid, "Uid": user.Uid})
		if res {
			msg.Ids = append(msg.Ids, img.Aid)

			if config.Server.OSSUrl != "" && strings.Contains(img.Attachment, config.Server.OSSUrl) {
				oss, err := libraries.NewOSS(config.Server.OssEndpoint, config.Server.OssAccessKeyId, config.Server.OssAccessKeySecret, config.Server.OssBucketName)
				if err != nil {
					libraries.DEBUG("oss无法操作") //不影响数据库删除
				} else {
					err = oss.Delete(strings.Replace(img.Attachment, config.Server.OSSUrl, "", 1))
					if err != nil {
						libraries.DEBUG("oss无法删除") //不影响数据库删除
					}
				}

			} else {
				os.Remove("./static" + img.Attachment)
			}
		}
	}
	c.Output_data(msg)
	msg.Put()
}
func check_dir(dir string) int16 {
	exist, err := libraries.PathExists(dir)
	if err != nil {

		return protocol.Fail
	}
	if !exist {
		err := os.Mkdir(dir, os.ModePerm)
		if err != nil {
			libraries.DEBUG("新建文件夹失败")

			return protocol.Fail
		}
	}
	return protocol.Success
}
func upload_avatar(data *protocol.MSG_U2WS_upload_avatar, c *server.Context) {
	user := public.Getuserinfo(c)
	if user.Uid == 0 {
		c.Out_common(protocol.Err_Notlogin, "")
		return
	}
	imagetype, size, err := getimageTypeAndSizefastimage(data.Imgdata)
	if err != nil || size == nil {
		c.Out_common(protocol.Err_Imgtype, "")
		return
	}

	var ext string
	if imagetype != fastimage.GIF {
		if config.Server.Webp {
			ext = "webp"
			err, data.Imgdata = libraries.ConvertImgFromFastimage(data.Imgdata, size, imagetype, "webp", 1, 1, 75)
		} else {
			ext = "jpg"
			err, data.Imgdata = libraries.ConvertImgFromFastimage(data.Imgdata, size, imagetype, "jpg", 1, 1, 75)
		}
		if err != nil {
			c.Adderr(err, nil)
			c.Out_common(protocol.Fail, "")
			return
		}
	}
	dir := "./static/static/avatar/user"
	avatar := strconv.Itoa(int(user.Uid)) + "_" + strconv.Itoa(int(time.Now().Unix())) + "." + ext
	oldfilename := dir + "/" + user.Avatar
	newfilename := dir + "/" + avatar
	if code, err := saveUpload(oldfilename, newfilename, data.Imgdata); code != protocol.Success || err != nil {
		c.Out_common(code, "")
		c.Adderr(err, nil)
		return
	}
	msg := protocol.Pool_MSG_WS2U_upload_avatar.Get().(*protocol.MSG_WS2U_upload_avatar)
	msg.Result = protocol.Success
	msg.Avatar = avatar
	c.Output_data(msg)
	msg.Put()
	user.Avatar = avatar
	user.UpdateDB()
}
func saveUpload(oldfilename, newfilename string, imgdata []byte) (int16, error) {
	f_new := strings.Replace(newfilename, "./static", "", 1)
	f_old := strings.Replace(oldfilename, "./static", "", 1)
	if config.Server.OssEndpoint == "" {
		tmp_f, err := os.OpenFile(newfilename, os.O_CREATE|os.O_TRUNC|os.O_WRONLY, 0666)
		if err != nil {
			libraries.DEBUG("新建文件失败" + newfilename)
			return protocol.Fail, err
		}
		tmp_f.Write(imgdata)
		tmp_f.Close()
		if oldfilename != "" {
			os.Remove(oldfilename)
		}

	} else {
		oss, err := libraries.NewOSS(config.Server.OssEndpoint, config.Server.OssAccessKeyId, config.Server.OssAccessKeySecret, config.Server.OssBucketName)
		if err != nil {
			libraries.DEBUG("oss打开失败")
			return protocol.Fail, err
		}
		err = oss.UploadByte(f_new, imgdata)
		if err != nil {
			libraries.DEBUG("oss上传失败" + f_new)
			return protocol.Fail, err
		}
		if oldfilename != "" {
			oss.Delete(f_old)
		}
	}
	return protocol.Success, nil
}

var tmpno uint32

func upload_tmp_image(data *protocol.MSG_U2WS_upload_tmp_image, c *server.Context) {
	user := public.Getuserinfo(c)
	if user.Uid == 0 {
		c.Out_common(protocol.Err_Notlogin, "")
		return
	}
	if !user.Group.Allowpostimage {
		c.Out_common(protocol.Err_Groupperm, "")
		return
	}
	if user.Group.Maxattachnum > 0 {
		if user.Group.Maxattachnum-user.Count.Todayattachs <= 0 {
			c.Out_common(protocol.Err_NotEnoughAttachs, "")
			return
		}
	}
	if user.Group.Maxsizeperday > 0 {
		if user.Group.Maxsizeperday-user.Count.Todayattachsize <= 0 {
			c.Out_common(protocol.Err_NotEnoughAttachsize, "")
			return
		}
	}
	imagetype, size, err := getimageTypeAndSizefastimage(data.Data)
	if err != nil || size == nil {
		c.Out_common(protocol.Err_Imgtype, "")
		return
	}
	if imagetype != fastimage.GIF {
		if config.Server.Webp {

			err, data.Data = libraries.ConvertImgFromFastimage(data.Data, size, imagetype, "webp", 1, 1, 75)
		} else {

			err, data.Data = libraries.ConvertImgFromFastimage(data.Data, size, imagetype, "jpg", 1, 1, 75)
		}
		if err != nil {
			c.Adderr(err, nil)
			c.Out_common(protocol.Fail, "")
			return
		}
	}
	no := int(atomic.AddUint32(&tmpno, 1)) * -1
	tmpfilename := "./temp/" + strconv.Itoa(int(user.Uid)) + "_" + strconv.Itoa(no) + ".tmp"
	tmp_f, err := os.OpenFile(tmpfilename, os.O_CREATE|os.O_TRUNC|os.O_WRONLY, 0666)
	if err != nil {
		libraries.DEBUG("临时文件写出失败" + tmpfilename)
		c.Out_common(protocol.Err_filePermission, "")
	}
	defer tmp_f.Close()
	tmp_f.Write(data.Data)
	msg := protocol.Pool_MSG_WS2U_upload_tmp_image.Get().(*protocol.MSG_WS2U_upload_tmp_image)
	msg.Aid = int64(no)
	c.Output_data(msg)
	msg.Put()
	return
}

//自动刷新日期dir
func getImgFilename(c *server.Context, user *db.Common_member, ext string) string {
	return uploadDir + "/" + strconv.Itoa(int(user.Uid)) + "_" + strconv.Itoa(int(time.Now().UnixNano()/1e6)) + strconv.Itoa(rand.Intn(9999)) + "." + ext
}

var uploadDir string

func getUploadDit() {
	now := time.Now()
	timeStr := time.Now().Format("2006-01-02")
	today, _ := time.ParseInLocation("2006-01-02", timeStr, time.Local)
	defer time.AfterFunc(today.AddDate(0, 0, 1).Sub(now), getUploadDit)
	dir := "./static/w/" + strconv.Itoa(now.Year())
	if code := check_dir(dir); code != protocol.Success {
		libraries.DEBUG("创建文件夹失败" + dir)
		return
	}
	dir += "/" + strconv.Itoa(int(now.Month()))
	if code := check_dir(dir); code != protocol.Success {
		libraries.DEBUG("创建文件夹失败" + dir)
		return
	}
	dir += "/" + strconv.Itoa(now.Day())
	if code := check_dir(dir); code != protocol.Success {
		libraries.DEBUG("创建文件夹失败" + dir)
		return
	}
	uploadDir = dir
}
func init() {
	rand.Seed(time.Now().Unix())
	getUploadDit()
}

func getimageTypeAndSizefastimage(data []byte) (imagetype fastimage.ImageType, size *fastimage.ImageSize, err error) {
	buf := uploadbufpool.Get().(*libraries.MsgBuffer)
	buf.Reset()
	defer uploadbufpool.Put(buf)
	buf.Write(data)
	imagetype, size, err = fastimage.DetectImageTypeFromReader(buf)
	if err == io.EOF || size == nil {
		var imgconfig image.Config
		switch imagetype {
		case fastimage.BMP: //fastimage未对bmp与webp识别
			buf.Reset()
			buf.Write(data)
			imgconfig, err = bmp.DecodeConfig(buf)
			if imgconfig.Width > 0 && imgconfig.Height > 0 {
				size = &fastimage.ImageSize{Height: uint32(imgconfig.Height), Width: uint32(imgconfig.Width)}
			}
		default:
			buf.Reset()
			buf.Write(data)
			imgconfig, err = webp.DecodeConfig(buf)
			if imgconfig.Width > 0 && imgconfig.Height > 0 {
				size = &fastimage.ImageSize{Height: uint32(imgconfig.Height), Width: uint32(imgconfig.Width)}
			}
		}
	}
	return
}
