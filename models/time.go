package models

import (
	"bbs/libraries"
	"fmt"
	"os"
	"runtime/debug"
	"strconv"

	"time"

	"github.com/luyu6056/cache"
)

var VisitorNum int32

func Model_init() {
	go timer()
	usergroup_init()
	memberinfo_init()
	setting_init()
	nav_init()
	member_profile_init()
	member_calc_num()
	shieldingwordinit()
	blockinit()
	foruminit()
	forum_thread_init()
	credit_ruleinit()
	recent_use_tag()
	//stat_reset()
	reflush()
	email_init()

}

func timer() {
	tick := time.Tick(time.Second)
	for t := range tick {
		now := t.Unix()
		go time_second(now)
		if now%60 == 0 {
			go time_minute(now)
		}
		if now%3600 == 0 {
			go time_hour(now)
			if libraries.Todaytimestamp()-now < 60 {
				go time_day(now)
			}
		}

	}
}
func time_second(t int64) {
	defer func() {
		if err := recover(); err != nil {
			fmt.Println(err)
			debug.PrintStack()
		}
	}()
}
func time_minute(t int64) {
	defer func() {
		if err := recover(); err != nil {
			fmt.Println(err)
			debug.PrintStack()
		}
	}()
	member_calc_num()
	recent_use_tag()
	check_setting()
	check_forum_thread_mod(t)
	res, err := (&Model{}).Query("select unix_timestamp(now()) as now")
	if err != nil || len(res) == 0 {
		libraries.DEBUG("获取mysql服务器时间戳失败", err)
		return
	}
	mysql_timestamp, err := strconv.Atoi(res[0]["now"])
	if err != nil || mysql_timestamp <= 0 {
		libraries.DEBUG("获取mysql服务器时间戳失败", err)
		return
	}
	check_thread_index(mysql_timestamp)
	check_member_count(mysql_timestamp)
	check_forum(mysql_timestamp)

}
func time_hour(t int64) {
	defer func() {
		if err := recover(); err != nil {
			fmt.Println(err)
			debug.PrintStack()
		}
	}()
}
func time_day(t int64) {
	defer func() {
		if err := recover(); err != nil {
			fmt.Println(err)
			debug.PrintStack()
		}
	}()
	foruminit()
	reflush()
	//stat_reset()
	delete_attach()
}
func reflush() {
	c := cache.Hget("reflush", "syscache")

	todaytime := libraries.Todaytimestamp() + 3600*5

	if c.Load_int64("time") < todaytime {
		reflush_member()
		reflush_thread()
		c.Set("time", todaytime)
	}
	//清理temp
	filelist, err := libraries.ListDir("./temp", "")
	if err == nil {
		for _, filename := range filelist {
			if fileinfo, err := os.Stat(filename); err == nil {
				if time.Since(fileinfo.ModTime()).Hours() > 24 {
					os.Remove(filename)
				}
			}
		}
	}
}
