package protocol

import (
	"bbs/libraries"
	"unsafe"
)

func WRITE_int8(data int8, buf *libraries.MsgBuffer) {
	buf.WriteByte(byte(data))
}
func WRITE_int16(data int16, buf *libraries.MsgBuffer) {
	b := buf.Make(2)
	b[0] = byte(data)
	b[1] = byte(data >> 8)
}
func WRITE_int32(data int32, buf *libraries.MsgBuffer) {
	b := buf.Make(4)
	b[0] = byte(data)
	b[1] = byte(data >> 8)
	b[2] = byte(data >> 16)
	b[3] = byte(data >> 24)

}
func WRITE_int64(data int64, buf *libraries.MsgBuffer) {
	b := buf.Make(8)
	b[0] = byte(data)
	b[1] = byte(data >> 8)
	b[2] = byte(data >> 16)
	b[3] = byte(data >> 24)
	b[4] = byte(data >> 32)
	b[5] = byte(data >> 40)
	b[6] = byte(data >> 48)
	b[7] = byte(data >> 56)
}
func WRITE_string(data string, buf *libraries.MsgBuffer) {
	length := len(data)
	b := buf.Make(2)
	b[0] = byte(length)
	b[1] = byte(length >> 8)
	x := (*[2]uintptr)(unsafe.Pointer(&data))
	h := [3]uintptr{x[0], x[1], x[1]}
	buf.Write(*(*[]byte)(unsafe.Pointer(&h)))
}

func READ_int8(bin *libraries.MsgBuffer) int8 {
	b := bin.Next(1)
	if len(b) == 1 {
		return int8(b[0])
	}
	return 0
}
func READ_int16(bin *libraries.MsgBuffer) int16 {
	b := bin.Next(2)
	return int16(b[0]) | int16(b[1])<<8

}
func READ_int32(bin *libraries.MsgBuffer) int32 {
	b := bin.Next(4)
	return int32(b[0]) | int32(b[1])<<8 | int32(b[2])<<16 | int32(b[3])<<24
}
func READ_int64(bin *libraries.MsgBuffer) int64 {
	b := bin.Next(8)
	return int64(b[0]) | int64(b[1])<<8 | int64(b[2])<<16 | int64(b[3])<<24 | int64(b[4])<<32 | int64(b[5])<<40 | int64(b[6])<<48 | int64(b[7])<<56
}
func READ_string(bin *libraries.MsgBuffer) string {
	b := bin.Next(2)
	length := int(b[0]) | int(b[1])<<8
	if length > 0 {
		b := make([]byte, length)
		copy(b, bin.Next(length))
		return *(*string)(unsafe.Pointer(&b))
	}
	return ""
}
