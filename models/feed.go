package models

type Model_feed struct {
	Model
}

/*func (m *Model_feed)feed_add(icon string, title_template string, title_data string, body_template string, body_data map[string]string, body_general string, images []string, image_links []string, $target_ids='', $friend='', $appid='', $returnid=0, $id=0, $idtype='', $uid=0, $username='') {

	if(is_numeric($icon)) {
		$feed_table = 'home_feed_app';
		unset($feedarr['id'], $feedarr['idtype']);
	} else {
		if($feedarr['hash_data']) {
			$oldfeed = C::t('home_feed')->fetch_feedid_by_hashdata($feedarr['uid'], $feedarr['hash_data']);
			if($oldfeed) {
				return 0;
			}
		}
		$feed_table = 'home_feed';
	}

	return C::t($feed_table)->insert($feedarr, $returnid);
}*/
