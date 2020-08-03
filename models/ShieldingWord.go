package models

import (
	"bbs/configdata"
	"strings"
)

func shieldingwordinit() {
	configdata.HotUpdateConfigData("ShieldingWord")
}
func CheckShieldingWord(str string) bool {
	for _, v := range configdata.MConf_ShieldingWord {
		if strings.Contains(str, v.Word) {
			return false
		}
	}
	return true
}
func ReplaceShieldingWord(str string) string {
	for _, v := range configdata.MConf_ShieldingWord {
		if strings.Contains(str, v.Word) {
			str = strings.Replace(str, v.Word, "*", -1)
		}
	}
	return str
}
