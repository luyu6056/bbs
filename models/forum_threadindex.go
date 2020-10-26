package models

import (
	"bbs/db"
	"bbs/libraries"
	"runtime"
	"strconv"
	"strings"
	"sync"
)

//统一由Forum_thread_index_Begin新建，End放回去，禁止&或者new新建
//forum_thred_index里面都是只读方法，不加锁，由Forum_thread_index_Begin进行Rlock和RUnlock
//修改由Model_Forum_thread实现，全部加Lock和Unlock
type forum_thred_index struct {
	Result     []int32
	ResultList []*db.Forum_thread_cache
	cachetmp   []*db.Forum_thread_cache
	noResult   bool
	Less       func(a, b *db.Forum_thread_cache) bool
}
type Forum_thred_index_ struct { //索引
	Subject map[string][]int32
	Author  map[string][]int32
	Fid     map[int32][]int32
	Typeid  map[int16][]int32
	Uid     map[int32][]int32
	Special map[int8][]int32
	Digest  []int32
}

var (
	forum_thread_cache      []*db.Forum_thread_cache
	forum_thread_cache_lock sync.RWMutex
	forum_thread_tid_offset int32
	forum_thread_index      = &Forum_thred_index_{
		Subject: make(map[string][]int32),
		Author:  make(map[string][]int32),
		Fid:     make(map[int32][]int32),
		Typeid:  make(map[int16][]int32),
		Uid:     make(map[int32][]int32),
		Special: make(map[int8][]int32),
	}
)

func (model *Model_Forum_thread) Build_thread_index(where map[string]interface{}, master bool) {

	forum_thread_cache_lock.Lock()
	defer forum_thread_cache_lock.Unlock()

	count, _ := model.Table("Forum_thread").Master(master).Where(where).Count()
	var (
		i                   int
		displayorder_thread = map[int8][]*db.Forum_thread_cache{}
		//记录变动的缓存
		keySubject = make(map[string]bool)
		keyAuthor  = make(map[string]bool)
		keyFid     = make(map[int32]bool)
		keyTypeid  = make(map[int16]bool)
		keyUid     = make(map[int32]bool)
		keySpecial = make(map[int8]bool)
	)

	for true {
		var (
			threads      []*db.Forum_thread_cache
			thread_datas []*db.Forum_thread_data
		)
		i++
		err := model.Table("Forum_thread").Prepare().Where(where).Master(master).Page([]int{i, 10000}).Select(&threads)
		if err != nil {
			libraries.DEBUG("建立缓存出错", err)
			return
		}
		if len(threads) == 0 {
			break
		}
		libraries.DEBUG("正在建立thread缓存", strconv.Itoa((i-1)*10000+1)+"/"+strconv.Itoa(count))
		tids := make([]int32, len(threads))
		for k, v := range threads {
			tids[k] = v.Tid
		}
		str_1 := map[string]bool{}
		err = model.Table("Forum_thread_data").Where(map[string]interface{}{"Tid": tids}).Master(master).Limit(0).Select(&thread_datas)
		if err != nil {
			libraries.DEBUG("建立缓存出错", err)
			return
		}
		for _, thread := range threads {
			thread.LowerSubject = strings.ToLower(thread.Subject)
			tid := thread.Tid
			if l := tid - forum_thread_tid_offset - int32(len(forum_thread_cache)) + 1; l > 0 {
				forum_thread_cache = append(forum_thread_cache, make([]*db.Forum_thread_cache, l)...)
			}
			//先检查是否要删除旧的
			cache := forum_thread_cache[tid-forum_thread_tid_offset]
			if cache != nil {
				subject := []rune(cache.LowerSubject)
				if cache.Redirect == 0 {

					str_1 := map[string]bool{}
					for _, v := range subject {
						if s := string(v); s != "" && s != " " {
							str_1[s] = true
						}

					}
					for key, _ := range str_1 {
						if index := libraries.SearchInt32(forum_thread_index.Subject[key], tid); index > -1 {
							forum_thread_index.Subject[key] = append(forum_thread_index.Subject[key][:index], forum_thread_index.Subject[key][index+1:]...)
						}
					}
					if cache.Author != "" {
						author := []rune(cache.Author)
						str_1 = map[string]bool{}
						for _, v := range author {
							str_1[string(v)] = true
						}
						for key, _ := range str_1 {
							if index := libraries.SearchInt32(forum_thread_index.Author[key], tid); index > -1 {
								forum_thread_index.Author[key] = append(forum_thread_index.Author[key][:index], forum_thread_index.Author[key][index+1:]...)
							}
						}
					}

				}
				if index := libraries.SearchInt32(forum_thread_index.Special[cache.Special], tid); index > -1 {
					forum_thread_index.Special[cache.Special] = append(forum_thread_index.Special[cache.Special][:index], forum_thread_index.Special[cache.Special][index+1:]...)
				}
				if index := libraries.SearchInt32(forum_thread_index.Fid[cache.Fid], tid); index > -1 {
					forum_thread_index.Fid[cache.Fid] = append(forum_thread_index.Fid[cache.Fid][:index], forum_thread_index.Fid[cache.Fid][index+1:]...)
				}
				if index := libraries.SearchInt32(forum_thread_index.Typeid[cache.Typeid], tid); index > -1 {
					forum_thread_index.Typeid[cache.Typeid] = append(forum_thread_index.Typeid[cache.Typeid][:index], forum_thread_index.Typeid[cache.Typeid][index+1:]...)
				}
				if index := libraries.SearchInt32(forum_thread_index.Uid[cache.Authorid], tid); index > -1 {
					forum_thread_index.Uid[cache.Authorid] = append(forum_thread_index.Uid[cache.Authorid][:index], forum_thread_index.Uid[cache.Authorid][index+1:]...)
				}
				if cache.Digest > 0 {
					if index := libraries.SearchInt32(forum_thread_index.Digest, tid); index > -1 {
						forum_thread_index.Digest = append(forum_thread_index.Digest[:index], forum_thread_index.Digest[index+1:]...)
					}
				}
				if cache.Displayorder > 1 {
					switch cache.Displayorder {
					case 2:
						forum := GetForumByFid(cache.Fid)
						if forum == nil || forum.Fup == 0 {
							return
						}
						for _, f := range GetAllForum() {
							if f.Status != 3 && f.Fid == forum.Fup && f.Fid != cache.Fid {
								if index := libraries.SearchInt32(forum_thread_index.Fid[f.Fid], cache.Tid); index > -1 {
									forum_thread_index.Fid[f.Fid] = append(forum_thread_index.Fid[f.Fid][:index], forum_thread_index.Fid[f.Fid][index+1:]...)
								}
							}
						}
					case 3:
						for _, f := range GetAllForum() {
							if f.Status != 3 && f.Fid != cache.Fid {
								if index := libraries.SearchInt32(forum_thread_index.Fid[f.Fid], cache.Tid); index > -1 {
									forum_thread_index.Fid[f.Fid] = append(forum_thread_index.Fid[f.Fid][:index], forum_thread_index.Fid[f.Fid][index+1:]...)
								}
							}
						}
					}

				}
			}
			/*for _, str := range []string{" ", "/", `\`, "(", "（", ")", "）", "【", "[", "】", "]", "~", "！", ";", "；", "。", ",", "，", "'", ">", "=", "<", ":", "：", `"`, "《", "》", "、", "_", "”", "“", "?", "？"} {

			}*/
			//跳过已删除的
			if thread.Closed >= db.ThreadCloseDelete {
				continue
			}
			subject := []rune(thread.LowerSubject)
			if thread.Redirect == 0 {
				for key := range str_1 {
					delete(str_1, key)
				}

				for _, v := range subject {
					if s := string(v); s != "" && s != " " {
						str_1[s] = true
					}

				}
				for key, _ := range str_1 {
					if libraries.SearchInt32(forum_thread_index.Subject[key], tid) == -1 {
						forum_thread_index.Subject[key] = append(forum_thread_index.Subject[key], tid)
						keySubject[key] = true
					}
				}
				if thread.Author != "" {
					author := []rune(thread.Author)
					for key := range str_1 {
						delete(str_1, key)
					}
					for _, v := range author {
						str_1[string(v)] = true
					}
					for key, _ := range str_1 {
						if libraries.SearchInt32(forum_thread_index.Author[key], tid) == -1 {
							forum_thread_index.Author[key] = append(forum_thread_index.Author[key], tid)
							keyAuthor[key] = true
						}
					}
				}

			}
			if libraries.SearchInt32(forum_thread_index.Special[thread.Special], tid) == -1 {
				forum_thread_index.Special[thread.Special] = append(forum_thread_index.Special[thread.Special], tid)
				keySpecial[thread.Special] = true
			}
			if libraries.SearchInt32(forum_thread_index.Fid[thread.Fid], tid) == -1 {
				forum_thread_index.Fid[thread.Fid] = append(forum_thread_index.Fid[thread.Fid], tid)
				keyFid[thread.Fid] = true
			}
			if libraries.SearchInt32(forum_thread_index.Typeid[thread.Typeid], tid) == -1 {
				forum_thread_index.Typeid[thread.Typeid] = append(forum_thread_index.Typeid[thread.Typeid], tid)
				keyTypeid[thread.Typeid] = true
			}
			if libraries.SearchInt32(forum_thread_index.Uid[thread.Authorid], tid) == -1 {
				forum_thread_index.Uid[thread.Authorid] = append(forum_thread_index.Uid[thread.Authorid], tid)
				keyUid[thread.Authorid] = true
			}
			if thread.Digest > 0 {
				if libraries.SearchInt32(forum_thread_index.Digest, tid) == -1 {
					forum_thread_index.Digest = append(forum_thread_index.Digest, tid)
				}
			} else {
				if index := libraries.SearchInt32(forum_thread_index.Digest, tid); index != -1 {
					forum_thread_index.Digest = append(forum_thread_index.Digest[:index], forum_thread_index.Digest[index+1:]...)
				}
			}
			thread.Postlen = nil

			forum_thread_cache[tid-forum_thread_tid_offset] = thread
			if thread.Displayorder > 1 {
				displayorder_thread[thread.Displayorder] = append(displayorder_thread[thread.Displayorder], thread)
			}
			for _, v := range thread_datas {
				if v.Tid == thread.Tid {
					thread.Views = v
				}
			}
			if thread.Views == nil {
				thread.Views = &db.Forum_thread_data{Tid: thread.Tid}
			}
		}
	}

	for _, threads := range displayorder_thread {
		for _, thread := range threads {
			switch thread.Displayorder {
			case 2:
				forum := GetForumByFid(thread.Fid)
				if forum == nil || forum.Fup == 0 {
					continue
				}
				for _, f := range GetAllForum() {
					if f.Status != 3 && f.Fid == forum.Fup && f.Fid != thread.Fid {
						if libraries.SearchInt32(forum_thread_index.Fid[f.Fid], thread.Tid) == -1 {
							forum_thread_index.Fid[f.Fid] = append(forum_thread_index.Fid[f.Fid], thread.Tid)
							keyFid[f.Fid] = true
						}
					}
				}
			case 3:
				for _, f := range GetAllForum() {
					if f.Status != 3 && f.Fid != thread.Fid {
						if libraries.SearchInt32(forum_thread_index.Fid[f.Fid], thread.Tid) == -1 {
							forum_thread_index.Fid[f.Fid] = append(forum_thread_index.Fid[f.Fid], thread.Tid)
							keyFid[f.Fid] = true
						}
					}
				}
			}

		}
	}

	for key := range keyAuthor {
		libraries.SortInt32(forum_thread_index.Author[key])
	}

	for key := range keySubject {
		libraries.SortInt32(forum_thread_index.Subject[key])
	}
	for key := range keyFid {
		libraries.SortInt32(forum_thread_index.Fid[key])

	}
	for key := range keyTypeid {
		libraries.SortInt32(forum_thread_index.Typeid[key])
	}
	for key := range keyUid {
		libraries.SortInt32(forum_thread_index.Uid[key])
	}
	for key := range keySpecial {
		libraries.SortInt32(forum_thread_index.Special[key])
	}

	libraries.SortInt32(forum_thread_index.Digest)
}

var forum_thred_index_chan = make(chan *forum_thred_index, runtime.NumCPU()*2)

func init() {
	for i := 0; i < cap(forum_thred_index_chan); i++ {
		forum_thred_index_chan <- &forum_thred_index{}
	}
}
func Forum_thread_index_Begin() *forum_thred_index {
	f := <-forum_thred_index_chan
	f.noResult = true
	return f
}
func (f *forum_thred_index) End() {
	forum_thred_index_chan <- f
}
func (f *forum_thred_index) GetThreadlistByFid(fid int32) {
	f.search_result(forum_thread_index.Fid[fid])
}
func (f *forum_thred_index) GetThreadlistByTypeid(typeid int16) {
	f.search_result(forum_thread_index.Typeid[typeid])
}
func (f *forum_thred_index) GetThreadlistByUid(uid int32) {
	f.search_result(forum_thread_index.Uid[uid])
}

func (f *forum_thred_index) GetThreadlistBySubject(word string) {
	for _, v := range strings.ToLower(word) {
		if s := string(v); s != "" && s != " " {
			f.search_result(forum_thread_index.Subject[s])
		}
	}
}
func (f *forum_thred_index) GetThreadlistBySpecia(specia int8) {
	f.search_result(forum_thread_index.Special[specia])
}
func (f *forum_thred_index) GetThreadlistByDigest() {
	f.search_result(forum_thread_index.Digest)
}
func (f *forum_thred_index) search_result(newResult []int32) {
	if f.noResult {
		if cap(f.Result) < len(newResult) {
			f.Result = make([]int32, len(newResult))
		}
		f.Result = f.Result[:len(newResult)]
		copy(f.Result, newResult)
		f.noResult = false
		return
	} else if len(f.Result) == 0 {
		return
	}

	var index, old_index, new_index int
	for old_index < len(f.Result) && new_index < len(newResult) {

		switch {
		case f.Result[old_index] == newResult[new_index]:
			f.Result[index] = newResult[new_index]
			index++
			old_index++
			new_index++
		case f.Result[old_index] > newResult[new_index]:
			new_index++
		default:
			old_index++
		}
	}
	f.Result = f.Result[:index]
}

func (t *forum_thred_index) Order_result() {
	t.order_quickSort() //不稳定的排序，问题不大
}
func (t *forum_thred_index) order_mergesort(f func(a *db.Forum_thread_cache, b *db.Forum_thread_cache) bool, list, tmp []*db.Forum_thread_cache) {
	max_len := len(list)
	for i := 0; i < max_len-max_len&1; i += 2 {
		if f(list[i+1], list[i]) {
			list[i], list[i+1] = list[i+1], list[i]
		}

	}
	for i := 0; i < max_len-max_len&3; i += 4 {
		if f(list[i+2], list[i]) {
			list[i], list[i+2] = list[i+2], list[i]
		}
		if f(list[i+3], list[i+1]) {
			list[i+1], list[i+3] = list[i+3], list[i+1]
		}
		if f(list[i+2], list[i+1]) {
			list[i+1], list[i+2] = list[i+2], list[i+1]
		}

	}
	if max_len&3 == 3 {
		i := max_len - 3
		if f(list[i+2], list[i]) {
			list[i+1], list[i+2] = list[i+2], list[i+1]
			list[i], list[i+1] = list[i+1], list[i]
		} else if f(list[i+2], list[i+1]) {
			list[i+1], list[i+2] = list[i+2], list[i+1]
		}
	}
	var step, l, max, r int
	step = 4
	for step < max_len {
		step <<= 1
		for i := 0; i < max_len; i += step {
			l, r, max = i, i+step/2, i+step
			if max > max_len {
				max = max_len
			}
			for index := i; index < max; index++ {
				if l == step/2+i || (r < max && f(list[r], list[l])) {
					tmp[index] = list[r]
					r++
				} else {
					tmp[index] = list[l]
					l++
				}
			}
		}
		if step < max_len {
			for i := 0; i < max_len; i += step {
				l, r, max = i, i+step/2, i+step
				if max > max_len {
					max = max_len
				}
				for index := i; index < max; index++ {
					if l == step/2+i || (r < max && f(tmp[r], tmp[l])) {
						list[index] = tmp[r]
						r++
					} else {
						list[index] = tmp[l]
						l++
					}
				}
			}
		} else {
			copy(list, tmp)
		}
	}

}
func (model *Model_Forum_thread) ChangeDigestIndex(tids []int32, digest bool) {
	forum_thread_cache_lock.Lock()
	defer forum_thread_cache_lock.Unlock()
	for _, tid := range tids {
		if digest {
			if libraries.SearchInt32(forum_thread_index.Digest, tid) == -1 {
				forum_thread_index.Digest = append(forum_thread_index.Digest, tid)
			}
		} else {
			if index := libraries.SearchInt32(forum_thread_index.Digest, tid); index != -1 {
				forum_thread_index.Digest = append(forum_thread_index.Digest[:index], forum_thread_index.Digest[index+1:]...)
			}
		}
	}

	libraries.SortInt32(forum_thread_index.Digest)
}

func (f *forum_thred_index) order_quickSort() {
	n := len(f.ResultList)
	f.quickSort(f.ResultList, 0, n, maxDepth(n))
}

func (f *forum_thred_index) quickSort(data []*db.Forum_thread_cache, a, b, maxDepth int) {
	for b-a > 12 { // Use ShellSort for slices <= 12 elements
		if maxDepth == 0 {
			f.heapSort(data, a, b)
			return
		}
		maxDepth--
		mlo, mhi := f.doPivot(data, a, b)
		// Avoiding recursion on the larger subproblem guarantees
		// a stack depth of at most lg(b-a).
		if mlo-a < b-mhi {
			f.quickSort(data, a, mlo, maxDepth)
			a = mhi // i.e., quickSort(data, mhi, b)
		} else {
			f.quickSort(data, mhi, b, maxDepth)
			b = mlo // i.e., quickSort(data, a, mlo)
		}
	}
	if b-a > 1 {
		// Do ShellSort pass with gap 6
		// It could be written in this simplified form cause b-a <= 12
		for i := a + 6; i < b; i++ {
			if f.Less(data[i], data[i-6]) {
				data[i], data[i-6] = data[i-6], data[i]
			}
		}
		f.insertionSort(data, a, b)
	}
}
func (f *forum_thred_index) heapSort(data []*db.Forum_thread_cache, a, b int) {
	first := a
	lo := 0
	hi := b - a

	// Build heap with greatest element at top.
	for i := (hi - 1) / 2; i >= 0; i-- {
		f.siftDown(data, i, hi, first)
	}

	// Pop elements, largest first, into end of data.
	for i := hi - 1; i >= 0; i-- {
		data[first], data[first+i] = data[first+i], data[first]
		f.siftDown(data, lo, i, first)
	}
}
func (f *forum_thred_index) doPivot(data []*db.Forum_thread_cache, lo, hi int) (midlo, midhi int) {
	m := int(uint(lo+hi) >> 1) // Written like this to avoid integer overflow.
	if hi-lo > 40 {
		// Tukey's ``Ninther,'' median of three medians of three.
		s := (hi - lo) / 8
		f.medianOfThree(data, lo, lo+s, lo+2*s)
		f.medianOfThree(data, m, m-s, m+s)
		f.medianOfThree(data, hi-1, hi-1-s, hi-1-2*s)
	}
	f.medianOfThree(data, lo, m, hi-1)

	// Invariants are:
	//	data[lo] = pivot (set up by ChoosePivot)
	//	data[lo < i < a] < pivot
	//	data[a <= i < b] <= pivot
	//	data[b <= i < c] unexamined
	//	data[c <= i < hi-1] > pivot
	//	data[hi-1] >= pivot
	pivot := lo
	a, c := lo+1, hi-1

	for ; a < c && f.Less(data[a], data[pivot]); a++ {
	}
	b := a
	for {
		for ; b < c && !f.Less(data[pivot], data[b]); b++ { // data[b] <= pivot
		}
		for ; b < c && f.Less(data[pivot], data[c-1]); c-- { // data[c-1] > pivot
		}
		if b >= c {
			break
		}
		// data[b] > pivot; data[c-1] <= pivot
		data[b], data[c-1] = data[c-1], data[b]
		b++
		c--
	}
	// If hi-c<3 then there are duplicates (by property of median of nine).
	// Let's be a bit more conservative, and set border to 5.
	protect := hi-c < 5
	if !protect && hi-c < (hi-lo)/4 {
		// Lets test some points for equality to pivot
		dups := 0
		if !f.Less(data[pivot], data[hi-1]) { // data[hi-1] = pivot
			data[c], data[hi-1] = data[hi-1], data[c]
			c++
			dups++
		}
		if !f.Less(data[b-1], data[pivot]) { // data[b-1] = pivot
			b--
			dups++
		}
		// m-lo = (hi-lo)/2 > 6
		// b-lo > (hi-lo)*3/4-1 > 8
		// ==> m < b ==> data[m] <= pivot
		if !f.Less(data[m], data[pivot]) { // data[m] = pivot
			data[m], data[b-1] = data[b-1], data[m]
			b--
			dups++
		}
		// if at least 2 points are equal to pivot, assume skewed distribution
		protect = dups > 1
	}
	if protect {
		// Protect against a lot of duplicates
		// Add invariant:
		//	data[a <= i < b] unexamined
		//	data[b <= i < c] = pivot
		for {
			for ; a < b && !f.Less(data[b-1], data[pivot]); b-- { // data[b] == pivot
			}
			for ; a < b && f.Less(data[a], data[pivot]); a++ { // data[a] < pivot
			}
			if a >= b {
				break
			}
			// data[a] == pivot; data[b-1] < pivot
			data[a], data[b-1] = data[b-1], data[a]
			a++
			b--
		}
	}
	// Swap pivot into middle
	data[pivot], data[b-1] = data[b-1], data[pivot]
	return b - 1, c
}
func (f *forum_thred_index) insertionSort(data []*db.Forum_thread_cache, a, b int) {
	for i := a + 1; i < b; i++ {
		for j := i; j > a && f.Less(data[j], data[j-1]); j-- {
			data[j], data[j-1] = data[j-1], data[j]
		}
	}
}
func (f *forum_thred_index) siftDown(data []*db.Forum_thread_cache, lo, hi, first int) {
	root := lo
	for {
		child := 2*root + 1
		if child >= hi {
			break
		}
		if child+1 < hi && f.Less(data[first+child], data[first+child+1]) {
			child++
		}
		if !f.Less(data[first+root], data[first+child]) {
			return
		}
		data[first+root], data[first+child] = data[first+child], data[first+root]
		root = child
	}
}
func (f *forum_thred_index) medianOfThree(data []*db.Forum_thread_cache, m1, m0, m2 int) {
	// sort 3 elements
	if f.Less(data[m1], data[m0]) {
		data[m1], data[m0] = data[m0], data[m1]
	}
	// data[m0] <= data[m1]
	if f.Less(data[m2], data[m1]) {
		data[m2], data[m1] = data[m1], data[m2]
		// data[m0] <= data[m2] && data[m1] < data[m2]
		if f.Less(data[m1], data[m0]) {
			data[m1], data[m0] = data[m0], data[m1]
		}
	}
	// now data[m0] <= data[m1] <= data[m2]
}
func maxDepth(n int) int {
	var depth int
	for i := n; i > 0; i >>= 1 {
		depth++
	}
	return depth * 2
}

func (model *Model_Forum_thread) DeleteCache(tid int32) {
	forum_thread_cache_lock.Lock()
	defer forum_thread_cache_lock.Unlock()
	forum_thread_cache[tid-forum_thread_tid_offset] = nil

}
func check_thread_index(mysql_timestamp int) {

	var datas []*db.Forum_thread_data
	m := &Model_Forum_thread{}
	err := m.Table("Forum_thread_data").Where("unix_timestamp(Timestamp) > " + strconv.Itoa(mysql_timestamp-120)).Select(&datas)
	if err != nil {
		libraries.DEBUG("检查Forum_thread_data更新失败")
	}
	var tids []int32
	for _, d := range datas {
		if cache := GetForumThreadCacheByTid(d.Tid); cache != nil {
			if cache.Views.Timestamp.Unix() != d.Timestamp.Unix() {
				tids = append(tids, d.Tid)
			}
		} else {
			tids = append(tids, d.Tid)
		}
	}
	var threadlist []*db.Forum_thread
	err = m.Table("Forum_thread").Field("Tid,Timestamp").Where("unix_timestamp(Timestamp) > " + strconv.Itoa(mysql_timestamp-120)).Select(&threadlist)
	if err != nil {
		libraries.DEBUG("检查Forum_thread更新失败")
	}
	for _, t := range threadlist {
		if cache := GetForumThreadCacheByTid(t.Tid); cache != nil {
			if cache.Timestamp.Unix() != t.Timestamp.Unix() {
				tids = append(tids, t.Tid)
			}
		} else {
			tids = append(tids, t.Tid)

		}
	}
	if tids != nil {
		m.Build_thread_index(map[string]interface{}{"Tid": tids}, false)
	}
}

var postlen_lock sync.Mutex

func (model *Model_Forum_thread) GetPostPageByCache(cache *db.Forum_thread_cache, authorid int32) (page int16) {
	if cache.Postlen == nil {
		postlen_lock.Lock()
		defer postlen_lock.Unlock()
		if cache.Postlen == nil {
			var postList []struct {
				Count    int32
				Authorid int32
				Tid      int32
			}
			tmp := make(map[int32]int32)
			model.Table("Forum_post").Where(map[string]interface{}{"Tid": cache.Tid}).Field("count(*) as Count,Authorid,Tid").Group("Authorid,Tid").Limit(0).Select(&postList)
			for _, post := range postList {
				tmp[post.Authorid] = post.Count
				tmp[0] += post.Count

			}
			cache.Postlen = tmp
		}
	}
	page = int16(cache.Postlen[authorid] / int32(Setting.Postperpage))
	if cache.Postlen[authorid]%int32(Setting.Postperpage) > 0 {
		page++
	}
	return page
}
