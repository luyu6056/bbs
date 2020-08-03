package configdata

// 屏蔽字.xls
type Conf_ShieldingWord struct {
	ID   int32  `key` /*唯一ID*/
	Word string /*关键字*/
}

var MConf_ShieldingWord = map[string]*Conf_ShieldingWord{}

func HotUpdateConfigData(sheetname string) bool {
	switch sheetname {
	case "ShieldingWord":
		m := map[string]*Conf_ShieldingWord{}
		loadconfigdata(&m)
		MConf_ShieldingWord = m
		return true
	default:
	}
	return false
}
