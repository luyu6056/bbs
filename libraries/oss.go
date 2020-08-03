package libraries

import (
	"bytes"
	"strings"

	"github.com/aliyun/aliyun-oss-go-sdk/oss"
)

type Oss struct {
	Bucket *oss.Bucket
}

func filepatch(key string) string {
	key = strings.Replace(key, "//", "/", -1)
	if Substr(key, 0, 1) == "/" {
		key = strings.Replace(key, "/", "", 1)
	}
	return key
}
func (this *Oss) Upload(from string, to string) error {
	to = filepatch(to)
	return this.Bucket.PutObjectFromFile(to, from)
}
func (this *Oss) UploadByte(name string, b []byte) error {
	return this.Bucket.PutObject(filepatch(name), bytes.NewReader(b))

}
func NewOSS(Endpoint, AccessKeyId, AccessKeySecret, BucketName string) (*Oss, error) {
	o := new(Oss)
	client, err := oss.New(Endpoint, AccessKeyId, AccessKeySecret)
	if err != nil {
		return o, err
	}
	bucket, err := client.Bucket(BucketName)
	if err != nil {
		return o, err
	}
	o.Bucket = bucket
	return o, nil
}
func (this *Oss) Is_Exist(objectKey string) (bool, error) {
	return this.Bucket.IsObjectExist(filepatch(objectKey))
}
func (this *Oss) Delete(objectKey string) error {
	return this.Bucket.DeleteObject(filepatch(objectKey))
}
