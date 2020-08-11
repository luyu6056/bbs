package models

import (
	"bbs/config"
	"bbs/libraries"
	"bbs/protocol"
	"os"
	"strings"
)

func SaveUpload(oldfilename, newfilename string, imgdata []byte, flushCdn bool) (int16, error) {
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
		if flushCdn && config.Server.CDN_URL != "" {
			cdn := libraries.Newcdn(config.Server.OssAccessKeyId, config.Server.OssAccessKeySecret)
			if res, err := cdn.RefreshObjectCaches(config.Server.CDN_URL+f_new, "File"); !res || err != nil {
				return protocol.Err_CdnRefresh, err
			}
		}
	}
	return protocol.Success, nil
}
