package models

import (
	"errors"
	"os"
)

func UploadStatic(filename string, b []byte) error {
	dst_f, err := os.OpenFile("./static"+filename, os.O_CREATE|os.O_TRUNC|os.O_WRONLY, 0664)
	if err != nil {
		return err
	}

	n, err := dst_f.Write(b)
	if n != len(b) || err != nil {
		return errors.New("保存文件失败，无法写入")
	}
	dst_f.Close()
	return nil
}
