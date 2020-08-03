
	$('input[name="srchtxt"]').val(GET('Word'));
	var time=tpldata.Time/1e6;
	$('.sttl h2').html('结果: <em>找到 “<span class="emfont">'+$('input[name="srchtxt"]').val()+'</span>” 相关内容 '+tpldata.Threadcount+' 个</em>耗时'+time.toFixed(2)+'ms'); 
