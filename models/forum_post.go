package models

import (
	"bbs/db"
	"strconv"
)

type Model_Forum_post struct {
	Model
}

func (model *Model_Forum_post) GetPostInfoByID(pid int32) (post *db.Forum_post) {
	err := model.Table("Forum_post").Where("Pid = " + strconv.Itoa(int(pid))).Find(&post)
	if err != nil {
		model.Ctx.Adderr(err, map[string]interface{}{"pid": pid})
	}
	return
}
func (model *Model_Forum_post) GetPostInfoByPosition(tid int32, Position int32) (post *db.Forum_post) {
	err := model.Table("Forum_post").Where("Tid = " + strconv.Itoa(int(tid)) + " and Position = " + strconv.Itoa(int(Position))).Find(&post)
	if err != nil {
		model.Ctx.Adderr(err, map[string]interface{}{"tid": tid, "Position": Position})
	}
	return
}
func (model *Model_Forum_post) GetPostListByTid(tid int32) (postlist []*db.Forum_post) {
	err := model.Table("Forum_post").Where("Tid = " + strconv.Itoa(int(tid))).Select(&postlist)
	if err != nil {
		model.Ctx.Adderr(err, map[string]interface{}{"tid": tid})
	}
	return
}
func (model *Model_Forum_post) GetPostList(field string, where map[string]interface{}, order string, limit []int, groupby string) (postlist []*db.Forum_post) {
	err := model.Table("Forum_post").Field(field).Where(where).Order(order).Limit(limit...).Group(groupby).Select(&postlist)
	if err != nil {
		model.Ctx.Adderr(err, map[string]interface{}{"field": field, "where": where, "order": order, "limit": limit, "groupby": groupby})
	}
	return
}
func (model *Model_Forum_post) CountPostList(where map[string]interface{}, groupby string) (num int) {
	num, err := model.Table("Forum_post").Where(where).Group(groupby).Count()
	if err != nil {
		model.Ctx.Adderr(err, map[string]interface{}{"where": where, "groupby": groupby})
	}
	return
}
func (model *Model_Forum_post) AddPostFromMap(update map[string]interface{}) (id int64, res bool) {
	id, err := model.Table("Forum_post").Insert(update)
	if err != nil {
		model.Ctx.Adderr(err, map[string]interface{}{"update": update})
		return
	}
	return id, true
}
func (model *Model_Forum_post) GetLastPostFromUid(uid, tid int32, master bool) (post *db.Forum_post) {
	err := model.Table("Forum_post").Where(map[string]interface{}{"Authorid": uid, "Tid": tid}).Master(master).Order("Position desc").Find(&post)
	if err != nil {
		model.Ctx.Adderr(err, map[string]interface{}{"uid": uid, "tid": tid})
	}
	return
}
func (model *Model_Forum_post) Update(where, update map[string]interface{}) (res bool) {
	res, err := model.Table("Forum_post").Where(where).Update(update)
	if err != nil {
		model.Ctx.Adderr(err, map[string]interface{}{"update": update, "where": where})
		return false
	}
	return res
}
func (model *Model_Forum_post) Delete(where map[string]interface{}) (res bool) {
	res, err := model.Table("Forum_post").Where(where).Delete()
	if err != nil {
		model.Ctx.Adderr(err, map[string]interface{}{"where": where})
		return false
	}
	return res
}
func (model *Model_Forum_post) GetPostCount(where map[string]interface{}) (count int) {
	count, err := model.Table("Forum_post").Where(where).Count()
	if err != nil {
		model.Ctx.Adderr(err, map[string]interface{}{"where": where})

	}
	return
}
