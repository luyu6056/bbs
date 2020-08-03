package web

import (
	"bbs/controllers/public"
	"bbs/db"
	"bbs/libraries"
	"bbs/models"
	"bbs/protocol"
	"bbs/server"
	"bytes"
	"strings"
	"time"
)

func diy_save(data *protocol.MSG_U2WS_diy_save, c *server.Context) {
	user := public.Getuserinfo(c)
	if user.Allowadmincp == 0 {
		c.Out_common(protocol.Fail, "")
		return
	}

	if data.List[:49] != `<?xml version="1.0" encoding="ISO-8859-1"?><root>` {
		c.Out_common(protocol.Err_param, "")
		return
	}
	buf := bytes.NewBuffer([]byte(data.List[49 : len(data.List)-7]))
	var list []*protocol.MSG_diy_info
	for buf.Len() > 0 {
		typ, l := get_diy_xml(buf)
		if l != nil && typ != "" {
			switch l.(type) {
			case *protocol.MSG_diy_info:
				list = append(list, l.(*protocol.MSG_diy_info))
			case string:
			default:
				libraries.DEBUG("解析失败", data.List)
			}

		}
	}
	if len(list) > 0 {
		insert := &db.Common_diy_data{Uid: user.Uid, Dateline: time.Now().Unix(), Targettplname: data.TemplateName, Diycontent: list, Username: user.Username}
		err := models.Diysave(insert)
		if err != nil {
			c.Adderr(err, insert)
			c.Out_common(protocol.Err_db, "")
			return
		}
	}
	c.Out_common(protocol.Success, "")
}
func get_diy_xml(buf *bytes.Buffer) (typ string, res interface{}) {
	if buf.Len() < 8 {
		buf.Next(buf.Len())
		return "", nil
	}
	var t, e int
	e = bytes.Index(buf.Bytes(), []byte("<item "))
	t = 1
	deep := t
	for t > 0 {
		e += 7
		a := bytes.Index(buf.Bytes()[e:], []byte("</item>"))
		b := bytes.Index(buf.Bytes()[e:], []byte("<item"))
		if b == -1 {
			t--
			e += a
			continue
		}
		if a > b {
			t++
			deep = t
			e += b
		} else {
			t--
			e += a
		}

	}
	str := string(buf.Next(e + 7))

	r, _ := libraries.Preg_match_result(`<item id="([^"]+)">`, str, 1)
	if len(r) == 0 {
		return "", nil
	}
	typ = r[0][1]
	if strings.Index(typ, "diy") == 0 {
		res = &protocol.MSG_diy_info{Id: r[0][1]}
	} else {
		switch {
		case strings.Index(typ, "frame") == 0:
			res = &protocol.MSG_diy_frame{}
		case strings.Index(typ, "column") == 0:
			res = &protocol.MSG_diy_column{}
		case strings.Index(typ, "block") == 0:
			res = &protocol.MSG_diy_block{}
		case strings.Index(typ, "tab") == 0:
			res = &protocol.MSG_diy_tab{}
		case typ == "attr":
			res = &protocol.MSG_diy_attr{}
		case typ == "name", typ == "moveable", libraries.Preg_match(`\d+`, typ), typ == "style", typ == "text", typ == "href", typ == "color", typ == "float", typ == "margin", typ == "font-size", typ == "src":
		case typ == "className", typ == "switchType":
			res = []string{}
		case typ == "titles":
			res = &protocol.MSG_diy_title{}
		case typ == "first":
			res = &protocol.MSG_diy_first{}
		default:
			libraries.DEBUG("未处理数据", r[0][1])
		}
	}
	if deep > 1 {
		new_buf := bytes.NewBuffer([]byte(str[len(r[0][0]) : len(str)-7]))
		for new_buf.Len() > 0 {
			_typ, l := get_diy_xml(new_buf)
			switch {
			case strings.Index(_typ, "frame") == 0:
				switch res.(type) {
				case *protocol.MSG_diy_info:
					res.(*protocol.MSG_diy_info).Frame = l.(*protocol.MSG_diy_frame)
				default:
					libraries.DEBUG("无法解析的数据", _typ, l)
				}
			case _typ == "name":
				switch res.(type) {
				case *protocol.MSG_diy_attr:
					res.(*protocol.MSG_diy_attr).Name = l.(string)
				default:
					libraries.DEBUG("无法解析的数据", _typ, l)
				}
			case _typ == "moveable":
				switch res.(type) {
				case *protocol.MSG_diy_attr:
					res.(*protocol.MSG_diy_attr).Moveable = l.(string)
				default:
					libraries.DEBUG("无法解析的数据", _typ, l)
				}
			case _typ == "className":
				switch res.(type) {
				case *protocol.MSG_diy_attr:
					res.(*protocol.MSG_diy_attr).ClassName = l.(string)
				case *protocol.MSG_diy_title:
					res.(*protocol.MSG_diy_title).ClassName = l.([]string)
				case *protocol.MSG_diy_first:
					res.(*protocol.MSG_diy_first).ClassName = l.(string)
				default:
					libraries.Log("无法解析的数据,res: %T,typ:%s,_typ:%s", res, typ, _typ)
				}
			case _typ == "titles":
				switch res.(type) {
				case *protocol.MSG_diy_attr:
					switch l.(type) {
					case *protocol.MSG_diy_title:
						res.(*protocol.MSG_diy_attr).Titles = l.(*protocol.MSG_diy_title)
					case string:
						if l.(string) == "" {
							res.(*protocol.MSG_diy_attr).Titles = &protocol.MSG_diy_title{}
						} else {
							libraries.DEBUG("无法解析的数据", _typ, l)
						}
					default:
						libraries.Log("无法解析的数据,res: %T,typ:%s,_typ:%s", res, typ, _typ)
					}

				default:
					libraries.DEBUG("无法解析的数据", _typ, l)
				}
			case libraries.Preg_match(`^\d+`, _typ):
				switch res.(type) {
				case *protocol.MSG_diy_title:
					switch typ {
					case "className":
						res.(*protocol.MSG_diy_title).ClassName = append(res.(*protocol.MSG_diy_title).ClassName, l.(string))
					default:
						libraries.DEBUG("无法解析的数据", _typ, l)
					}
				case []string:
					s := res.([]string)
					s = append(s, l.(string))
					res = s

				default:
					libraries.Log("无法解析的数据,res:%T,typ:%s,_typ:%s", res, typ, _typ)
				}
			case _typ == "style":
				switch res.(type) {
				case *protocol.MSG_diy_title:
					res.(*protocol.MSG_diy_title).Style = l.(string)
				default:
					libraries.Log("无法解析的数据,res: %T,typ:%s,_typ:%s", res, typ, _typ)
				}
			case _typ == "text":
				switch res.(type) {
				case *protocol.MSG_diy_first:
					res.(*protocol.MSG_diy_first).Text = l.(string)
				default:
					libraries.Log("无法解析的数据,res: %T,typ:%s,_typ:%s", res, typ, _typ)
				}
			case _typ == "href":
				switch res.(type) {
				case *protocol.MSG_diy_first:
					res.(*protocol.MSG_diy_first).Href = l.(string)
				default:
					libraries.Log("无法解析的数据,res: %T,typ:%s,_typ:%s", res, typ, _typ)
				}
			case _typ == "color":
				switch res.(type) {
				case *protocol.MSG_diy_first:
					res.(*protocol.MSG_diy_first).Color = l.(string)
				default:
					libraries.Log("无法解析的数据,res: %T,typ:%s,_typ:%s", res, typ, _typ)
				}
			case _typ == "float":
				switch res.(type) {
				case *protocol.MSG_diy_first:
					res.(*protocol.MSG_diy_first).Float = l.(string)
				default:
					libraries.Log("无法解析的数据,res: %T,typ:%s,_typ:%s", res, typ, _typ)
				}
			case _typ == "margin":
				switch res.(type) {
				case *protocol.MSG_diy_first:
					res.(*protocol.MSG_diy_first).Margin = l.(string)
				default:
					libraries.Log("无法解析的数据,res: %T,typ:%s,_typ:%s", res, typ, _typ)
				}
			case _typ == "font-size":
				switch res.(type) {
				case *protocol.MSG_diy_first:
					res.(*protocol.MSG_diy_first).Font_size = l.(string)
				default:
					libraries.Log("无法解析的数据,res: %T,typ:%s,_typ:%s", res, typ, _typ)
				}
			case _typ == "src":
				switch res.(type) {
				case *protocol.MSG_diy_first:
					res.(*protocol.MSG_diy_first).Src = l.(string)
				default:
					libraries.Log("无法解析的数据,res: %T,typ:%s,_typ:%s", res, typ, _typ)
				}
			case _typ == "first":
				switch res.(type) {
				case *protocol.MSG_diy_title:
					res.(*protocol.MSG_diy_title).First = l.(*protocol.MSG_diy_first)
				default:
					libraries.Log("无法解析的数据,res: %T,typ:%s,_typ:%s", res, typ, _typ)
				}
			case _typ == "attr":
				switch res.(type) {
				case *protocol.MSG_diy_frame:
					res.(*protocol.MSG_diy_frame).Attr = l.(*protocol.MSG_diy_attr)
				case *protocol.MSG_diy_column:
					res.(*protocol.MSG_diy_column).Attr = l.(*protocol.MSG_diy_attr)
				case *protocol.MSG_diy_block:
					res.(*protocol.MSG_diy_block).Attr = l.(*protocol.MSG_diy_attr)
				case *protocol.MSG_diy_tab:
					res.(*protocol.MSG_diy_tab).Attr = l.(*protocol.MSG_diy_attr)
				default:
					libraries.Log("无法解析的数据,res: %T,typ:%s,_typ:%s", res, typ, _typ)
				}
			case strings.Index(_typ, "column") == 0:
				switch res.(type) {
				case *protocol.MSG_diy_frame:
					res.(*protocol.MSG_diy_frame).Column = l.(*protocol.MSG_diy_column)
				case *protocol.MSG_diy_tab:
					res.(*protocol.MSG_diy_tab).Column = l.(*protocol.MSG_diy_column)
				default:
					libraries.Log("无法解析的数据,res: %T,typ:%s,_typ:%s", res, typ, _typ)
				}
			case strings.Index(_typ, "block") == 0:
				switch res.(type) {
				case *protocol.MSG_diy_column:
					block := res.(*protocol.MSG_diy_column).Block
					block = append(block, l.(*protocol.MSG_diy_block))
					res.(*protocol.MSG_diy_column).Block = block
				default:
					libraries.Log("无法解析的数据,res: %T,typ:%s,_typ:%s", res, typ, _typ)
				}
			case _typ == "switchType":
				switch res.(type) {
				case *protocol.MSG_diy_title:

					res.(*protocol.MSG_diy_title).SwitchType = l.([]string)
				default:
					libraries.Log("无法解析的数据,res: %T,typ:%s,_typ:%s", res, typ, _typ)
				}
			case strings.Index(_typ, "tab") == 0:
				switch res.(type) {
				case *protocol.MSG_diy_info:
					res.(*protocol.MSG_diy_info).Tab = l.(*protocol.MSG_diy_tab)

				default:
					libraries.Log("无法解析的数据,res: %T,typ:%s,_typ:%s", res, typ, _typ)
				}
			default:
				libraries.Log("无法解析的数据,res: %T,typ:%s,_typ:%s", res, typ, _typ)
			}
			//if l != nil {
			//	res.List = append(res.List, l)
			//}

		}

	} else {
		v, _ := libraries.Preg_match_result(`<item id="([^"]+)">\s*(<!\[CDATA\[([^]]*)]]>)?\s*</item>`, str, 1)
		if len(v) > 0 {
			res = v[0][3]
		}
	}

	return
}
