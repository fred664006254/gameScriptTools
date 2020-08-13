namespace Scale9gridCfg
{
	export function get(key:string):string
	{
		return cfg[key];
	}
	export function getScale9gridCfg(key:string):string
	{
		let keyCfg=cfg[key];
		if(keyCfg)
		{
			return keyCfg.scale9grid;
		}
		return null;
	}
	let cfg=
	{
		"mainui_chatbg": {
			"scale9grid": "5,5,1,1"
		},
		"popupview_bg2": {
			"scale9grid": "315,100,1,1"
		},
		"public_9_bg4": {
			"scale9grid": "8,8,1,1"
		},
		"public_9_bg5": {
			"scale9grid": "8,22,1,1"
		},
		"public_alphabg": {
			"scale9grid": "2,2,1,1"
		},
		"public_tipbg": {
			"scale9grid": "317,44,1,1"
		},
		"public_9_bg8": {
			"scale9grid": "13,17,1,1"
		},
		"public_9_bg11": {
			"scale9grid": "11,11,1,1"
		},
		"wifeview_lovewordsbg": {
			"scale9grid": "147,55,43,37"
		},
		"wifeview_lovewordsbg_male": {
			"scale9grid": "147,55,43,37"
		},
		"public_9_bg20": {
			"scale9grid": "5,5,1,1"
		},
		"public_line3": {
			"scale9grid": "140,10,1,1"
		},
		"public_9_bg22": {
			"scale9grid": "320,94,1,1"
		},
		"manage_itembg": {
			"scale9grid": "52,109,1,1"
		},
		"public_9_managebg": {
			"scale9grid": "20,19,1,1"
		},
		"servant_topresbg": {
			"scale9grid": "12,14,1,1"
		},
		"public_9_probiginnerbg": {
			"scale9grid": "21,21,1,1"
		},
		"servant_bottombg": {
			"scale9grid": "238,111,1,1"
		}, 
		"public_9_bg28_down": {
			"scale9grid": "43,30,1,1"
		},
		"public_9_bg28": {
			"scale9grid": "43,30,1,1"
		},
		"public_9_bg29": {
			"scale9grid": "36,24,1,1"
		},
		"public_9_wordbg": {
			"scale9grid": "320,53,1,1"
		},
		"public_9_wordbg2": {
			"scale9grid": "320,53,1,1"
		},
		"searchstoryview_bottom": {
			"scale9grid": "320,53,1,1"
		},
		"public_9_viewmask": {
			"scale9grid": "2,2,1,1"
		},
		"servant_mask": {
			"scale9grid": "6,70,1,1"
		},
		"public_9_bg30": {
			"scale9grid": "14,17,1,1"
		},
		"public_numbg": {
			"scale9grid": "66,24,1,1"
		},
		"guide_rect": {
			"scale9grid": "17,17,1,1"
		},
		"public_itemtipbg": {
			"scale9grid": "2,10,1,1"
		},
		"public_itemtipbg2": {
			"scale9grid": "38,10,1,1"
		},
		"public_9_bg33": {
			"scale9grid": "19,18,1,1"
		},

		"public_chatbg1": {
			"scale9grid": "20,40,1,1"
		},
		"public_chatbg2": {
			"scale9grid": "20,40,1,1"
		},
		"public_chatbg3": {
			"scale9grid": "20,40,1,1"
		},
		"public_chatbg4": {
			"scale9grid": "20,40,1,1"
		},
		"public_chatbg5": {
			"scale9grid": "20,40,1,1"
		},
		"public_chatinputbg": {
			"scale9grid": "10,10,1,1"
		},
		"public_9_bg15": {
			"scale9grid": "68,20,1,1"
		},
		"commonview_titlebgshadow":{
			"scale9grid": "4,4,1,1"
		},
		"common_9_bg":{
			"scale9grid": "200,42,1,1"
		},
		"loginres_9_serverbg":{
			"scale9grid": "29,27,1,1"
		},
		"loginres_9_serverbg_down":{
			"scale9grid": "29,27,1,1"
		},
		"common_left_bg":{
			"scale9grid": "74,10,1,1"
		},
		"dinner_list_bg":{
			"scale9grid": "23,23,1,1"
		},

		"dinner_name_bg1":{
			"scale9grid": "13,19,1,1"
		},
		"dinner_name_bg2":{
			"scale9grid": "28,22,1,1"
		},

		"activity_rank_rightBg":{
			"scale9grid": "156,17,1,1"
		},
		"goto_dinner_namebg":{
			"scale9grid": "143,42,1,1"
		},
		"fourfloor":{
			"scale9grid": "22,22,1,1"
		},
		"fourpeople_mask":{
			"scale9grid": "16,75,1,1"
		},
		"activity_charge_red":{
			"scale9grid": "180,17,1,1"
		},
		"public_searchmask":{
			"scale9grid": "5,17,1,1"
		},
		"public_npc_talkbg":{
			"scale9grid":"7,15,1,1"
		},
		"public_9_tipbg":{
			"scale9grid":"320,5,1,1"
		},
		"prisonview_progress":{
			"scale9grid":"15,15,1,1"
		}, 

		"prisonview_namebg":{
			"scale9grid":"106,5,1,1"
		},

		"atkrace_name_bg":{
			"scale9grid":"52,13,1,1"
		},
		"alliance_attbg":{
			"scale9grid":"80,60,1,1"
		},
		"public_9_downbg":{
			"scale9grid":"21,21,1,1"
		},

		"":{
			"scale9grid":"320,62,1,1"
		},
		"alliance_effect":{
			"scale9grid":"75,75,1,1"
		},
		"public_9_powertipbg":{
			"scale9grid":"90,20,1,1"
		},
		"conquest_cellbg":{
			"scale9grid":"50,300,1,1"
		},
		"public_itemmask":{
			"scale9grid":"20,20,1,1"
		},
		"candyline":{
			"scale9grid":"5,5,1,1"
		},
		
		"public_9_manageinfo":{
			"scale9grid":"16,37,1,1"
		},
		"playerview_infobg":{
			"scale9grid":"139,22,1,1"
		},
		"acvipshopview_bluebottom":{
			"scale9grid":"8,8,1,1"
		},
		"atkracecross_rankbg":{
			"scale9grid":"320,90,1,1"
		},
		"wifeview_skingetbg":{
			"scale9grid":"90,10,1,1"
		},
		"activity_rank_cross":{
			"scale9grid":"2,2,1,1"
		},
		"firstrechargemask_bg":{
			"scale9grid":"5,32,1,1"
		},
		"atkracecross_timebg":{
			"scale9grid":"320,55,1,1"
		},
		"atkracecross_explain_bg":{
			"scale9grid":"89,5,1,1"
		},
		"thanksgivingview_top":{
			"scale9grid":"8,5,1,1"
		},
		"prestige_pillar_base":{
			"scale9grid":"84,47,1,1"
		},
		"prestige_black_bg":{
			"scale9grid":"96,14,1,1"
		},
		"coverBg":{
			"scale9grid":"639,873,1,1"
		},
		"playerpromo_abitopbg":{
			"scale9grid":"320,60,1,1"
		},
		"wifestatus_itembg":{
			"scale9grid":"300,65,1,1"
		},
		"wifestatus_itembg3":{
			"scale9grid":"300,65,1,1"
		},
		"wifestatus_itembg2":{
			"scale9grid":"300,98,1,1"
		},
		"wifestatus_itembg_9":{
			"scale9grid":"20,20,1,1"
		}, 
		"progress_type3_bg":{
			"scale9grid":"15,10,1,1"
		},
		"progress_type1_red":{
			"scale9grid":"10,12,1,1"
		},
		"progress_type1_bg2":{
			"scale9grid":"20,12,1,1"
		},
		"progress_type3_yellow":{
			"scale9grid":"10,12,1,1"
		},
		"progress_type2_bg":{
			"scale9grid":"29,12,1,1"
		},
		"progress_type2_yellow":{
			"scale9grid":"10,12,1,1"
		},
		"progress_type2_red":{
			"scale9grid":"10,12,1,1"
		},
		"arena_bottom":{
			"scale9grid":"320,15,1,1"
		}, 
		"guideGrayBg":{
			"scale9grid":"100,100,1,1"
		},
		"prisonview_liao_1_newui":{
			"scale9grid":"116,15,1,1"
		}, 
		"prisonview_liao_2_newui":{
			"scale9grid":"20,15,1,1"
		}, 
 
		"wifeview_namebg":{
			"scale9grid":"87,25,1,1" 
		},
		"wifeview_namebg_male":{
			"scale9grid":"87,25,1,1" 
		},
		"childview_namebg1":{
			"scale9grid":"104,30,1,1"
		},
		"childview_namebg2":{
			"scale9grid":"104,30,1,1"
		},
		"servant_alv_namebg":{
			"scale9grid":"83,33,1,1"
		},
		"public_9v_bg04":{
			"scale9grid":"26,26,1,1"
		},
		"servant_wifebookbg":{
			"scale9grid":"26,26,1,1"
		},
		"public_9v_bg05":{
			"scale9grid":"20,20,1,1"
		}, 
		"public_tc_bg01":{
			"scale9grid":"18,18,1,1"
		},
		"public_left":{
			"scale9grid":"17,15,1,1"
		},
		"public_9v_bg10":{
			"scale9grid":"33,16,1,1"
		} ,
		"public_9v_bg11":{
			"scale9grid":"70,60,1,1"
		}, 
		"public_9v_bg11_2":{
			"scale9grid":"116,20,1,1"
		}, 
		"public_hb_bg01":{
			"scale9grid":"70,15,1,1"
		}, 
		"public_biaoti2":{
			"scale9grid":"24,15,1,1"
		},
		"public_tc_bg02":{
			"scale9grid":"243,25,1,1"
		},

		"wifeview_xinxibanbg":{
			"scale9grid":"44,40,1,1"
		},
		"public_9v_bg09":{
			"scale9grid":"34,27,1,1"
		},
		"public_9v_bg06":{
			"scale9grid":"10,10,1,1"
		},
		"public_9v_bg02":{
			"scale9grid":"23,23,1,1"
		},
		"public_ditu":{
			"scale9grid":"2,2,1,1"
		}, 
		"public_tc_bg03":{
			"scale9grid":"20,20,1,1"
		},
		"public_listbg":{
			"scale9grid":"19,25,1,1"
		},
		"public_listbg2":{
			"scale9grid":"15,50,1,1"
		},
		"public_left2":{
			"scale9grid":"20,1,1,1"
		},
		"wifeview_balckbg":{
			"scale9grid":"5,64,1,1"
		},
		"wifeview_hongyantyouxiangbg":{
			"scale9grid":"55,42,1,1"
		},

		"servant_wenzibutiao":{
			"scale9grid":"15,20,1,1"
		}, 

		"public_9v_bg03":{
			"scale9grid":"25,32,1,1"
		},
		"public_dj_bg01":{
			"scale9grid":"21,30,1,1"
		},

		"public_balckbg":{
			"scale9grid":"5,5,1,1"
		}, 

		"activity_db_01":{
			"scale9grid":"29,31,1,1"
		},
		"activity_db_02":{
			"scale9grid":"2,2,1,1"
		},

		"public_9v_bg07":{
			"scale9grid":"30,25,1,1"
		},   
		"servant_biaoti2":{
			"scale9grid":"24,13,1,1"
		}, 
		"bookroom_cdbg":{
			"scale9grid":"10,9,1,1"
		},

		"public_tc_hd01":{
			"scale9grid":"20,15,1,1"
		},   
		"progress4tc_01":{
			"scale9grid":"16,10,1,1"
		},
		"progress4tc_02":{
			"scale9grid":"16,10,1,1"
		},
		"public_bottombg1":{
			"scale9grid":"300,15,1,1"
		},   

		"public_9v_bg08":{
			"scale9grid":"30,17,1,1"
		},
		"rank_biao":{
			"scale9grid":"251,16,1,1"
		},
		"public_tc_bg05":{
			"scale9grid":"125,3,1,1"
		}, 
		"shopview_itembg":{
			"scale9grid":"300,80,1,1"
		},
		"public_tcga_01":{
			"scale9grid":"8,8,1,1"
		},
		"public_tc_bg04":{
			"scale9grid":"150,10,1,1"
		},   
		"alliance_bg":{
			"scale9grid":"60,60,1,1"
		},    
		"servant_middlebg":{
			"scale9grid":"63,10,1,1"
		},   
		"public_lt_bg01":{
			"scale9grid":"5,5,1,1"
		},   
		"public_tc_srkbg05":{
			"scale9grid":"10,10,1,1"
		},  
		"public_9_black":{
			"scale9grid":"10,10,1,1"
		},

		"recharge_diban_01":{
			"scale9grid":"25,40,1,1"
		}, 
		"public_tc_bg06":{
			"scale9grid":"5,5,1,1"
		}, 
		"rechargevie_db_01":{
			"scale9grid":"180,60,1,1" 
		},
		"arena_bottom_bg":{
			"scale9grid":"300,200,1,1" 
		},
		"public_up3":{
			"scale9grid":"15,15,1,1" 
		},

		"dailyboss_shengli_bg":{
			"scale9grid":"27,27,1,1"

		},
		"battle_info_bg":{
			"scale9grid":"25,53,1,1" 
		},
		"guide_bottom":{
			"scale9grid":"25,25,1,1"
		},
		"public_line":{
			"scale9grid":"20,5,1,1"
		},
		"manage_di":{
			"scale9grid":"25,25,1,1"
		},
		"wifeview_wenzibg2":{
			"scale9grid":"115,19,1,1"
		},
		"dinner_finish_dt01":{
			"scale9grid":"14,12,1,1"
		},
		"dinner_finish_dt02":{
			"scale9grid":"14,12,1,1"
		},
		"public_ts_bg01":{
			"scale9grid":"30,15,1,1"
		},
		"acjadeview_red":{
			"scale9grid":"126,16,1,1"
		},
		"atkrace_1_newui":{
			"scale9grid":"30,20,1,1"
		},
		"atkrace_xiuxi":{
			"scale9grid":"25,25,1,1"
		},
		"manage_dix":{
			"scale9grid":"35,35,1,1"
		} ,
		"load_bg":{
			"scale9grid":"300,270,1,1"
		} ,
		"load_1":{
			"scale9grid":"205,18,1,1"
		},
		"load_2":{
			"scale9grid":"25,25,1,1"
		},
		"load_3":{
			"scale9grid":"5,5,1,1"
		},
		"conquest_di":{
			"scale9grid":"10,10,1,1"
		},
		"load_4":{
			"scale9grid":"5,5,1,1"
		},
		"public_v_bg01":{
			"scale9grid":"320,12,1,1"
		},
		"acluckbagview_sheng":{
			"scale9grid":"3,11,1,1"
		},
		"servant_middlebg2":{
			"scale9grid":"260,72,1,1"
		},
		"servant_yeqiankuang":{
			"scale9grid":"80,50,1,1"
		},
		"servant_biaotinew":{
			"scale9grid":"120,20,1,1"
		},   
		"funtionbottom":{
			"scale9grid":"200,7,1,1"
		},
		"servant_shuzitiao":{
			"scale9grid":"12,12,1,1"
		}, 
		"progress_type1_bg":{
			"scale9grid":"25,12,1,1"
		},
		"atkracecross_rewatdbg1_1":{
			"scale9grid":"123,17,1,1"
		},
		"atkracecross_rewatdbg2_1":{
			"scale9grid":"123,17,1,1"
		}, 
		"yearcard_bg01":{
			"scale9grid":"20,20,1,1"
		}, 
		"shareRewardPop":{
			"scale9grid":"77,24,1,1"
		},
		"limitedgiftview_bg":{
			"scale9grid":"320,156,1,1"
		},
		"public_icontimebg":{
			"scale9grid":"2,2,1,1"
		},
		"progress_type1_yellow2":{
			"scale9grid":"5,10,1,1"
		},
		"progress_type1_yellow_top":{
			"scale9grid":"0,10,1,1" 
		}, 
		"atkrace_arrest_bg_di":{
			"scale9grid":"100,10,1,1" 
		},
		"atkracevipbg":{
			"scale9grid":"20,37,1,1"
		} ,
		"public_9_qipao":{
			"scale9grid":"20,20,1,1"

		},
		"acrechargeboxview_buttombg":{
			"scale9grid":"310,115,1,1"
		},
		"acrechargeboxview_border":{
			"scale9grid":"304,119,1,1"
		},
		"acrechargeboxspview_buttombg_1":{
			"scale9grid":"310,115,1,1"
		},
		"acrechargeboxspview_buttombg_2":{
			"scale9grid":"310,115,1,1"
		},
		"acrechargeboxspview_border_1":{
			"scale9grid":"304,119,1,1"
		},

		"dragonboatprogress_bg":{
			"scale9grid": "3,2,17,6"
		},
		"dragonboatprogress":{
			"scale9grid": "2,8,19,0"
		}, 

		"dragonboatred":{
			"scale9grid": "7,10,0,0"
		}, 

		
		"accarnivalview_tab_green2":{
			"scale9grid": "194,18,0,0"
		}, 
		"public_listshotbg":{
			"scale9grid": "5,5,0,0"
		}, 

		"acsingleday_bottombg":{
			"scale9grid": "320,5,1,1"
		},
		"acsingleday_envelope_txtbg":{
			"scale9grid": "80,16,1,1"
		},
		"acsingleday_skinnamebg":{
			"scale9grid": "104,19,1,1"
		},
		"public_listbtn":{
			"scale9grid": "162,29,1,1"
		},
		"adult_listbg2":{
			"scale9grid": "7,40,1,1"
		},
		"adult_listbg3":{
			"scale9grid": "15,25,1,1"
		},
		"adult_listbg01":{
			"scale9grid": "62,37,1,1"
		},
		"char_cross_hornbg":{
			"scale9grid": "5,5,1,1"
		},
		"acrechargeboxview_buttombg_3":{
			"scale9grid": "314,115,1,1"
		},
		"aclotteryview_popbg2":{
			"scale9grid": "40,40,1,1"
		},
		"acchristmasview_1_dialog":{
			"scale9grid":"114,39,1,1"
		},
		"acchristmasview_1_planbg":{
			"scale9grid":"98,35,1,1"
		},
		"acchristmasview_1_completebg":{
			"scale9grid":"98,35,1,1"
		},
		"chat_crosscity_txtbg":{
			"scale9grid": "34,37,1,1"
		},
		"betheking_progress_border":{
			"scale9grid": "5,12,1,1"
		},
		"betheking_progress":{
			"scale9grid": "5,12,1,1"
		},
		"discussjzhoubottom":{
			"scale9grid": "45,420,1,1"
		},
		"discussredbg":{
			"scale9grid": "24,17,1,1"
		},
		"discusslistbg":{
			"scale9grid": "32,66,127,96"
		},
		"discuss_name_bg1":{
			"scale9grid": "13,15,1,1"
		},
		"public_lockbg":{
			"scale9grid":"123,19,1,1"
		},
		"progress_blood":{
			"scale9grid": "12,3,1,1"
		},
		"progress_bloodbg":{
			"scale9grid": "12,15,1,1"
		},
		"betheking_rolebg":{
			"scale9grid":"28,45,1,1"

		},
		"public_lvupcenter":{
			"scale9grid":"7,7,1,1"

		},
		"alliance_taskbg":{
			"scale9grid":"28,45,1,1"


		},
		"acsevenbuild_descbg3":{
			"scale9grid":"150,20,1,1"

		},
		"public_chatbg_king":{
			"scale9grid":"28,29,1,1"

		},
		"public_biaotinew":{
			"scale9grid":"141,16,1,1"
		},
		"trade_namebg":{
			"scale9grid":"29,17,1,1"
		},
		"chatview_morebg":{
			"scale9grid":"60,20,1,1"
		},
		"maintask_guidebg":{
			"scale9grid":"170,41,1,1"
		},
		"public_9_blue":{
			"scale9grid":"20,20,1,1"
		},
		"public_9_red":{
			"scale9grid":"20,20,1,1"
		},
		"acwipeboss_namebg":{
			"scale9grid":"50,15,1,1"
		},
		"acspringouting_numbg-1":{
			"scale9grid":"43,22,1,1"
		},
		"acspringouting_progressbar-1":{
			"scale9grid":"12,12,1,1"
		},
		"acspringouting_progressbg-1":{
			"scale9grid":"12,12,1,1"
		},
		"acspringouting_rightbg-1":{
			"scale9grid":"55,14,1,1"
		},
		"fanliReview_bg3":{
			"scale9grid":"320,10,1,1"
		},

		"achulaoview_progressbg-2":{
			"scale9grid":"64,17,1,1"
		},

		"xingcun_titlebg2":{
			"scale9grid":"77,18,1,1"
		},
		"xingcun_bg2":{
			"scale9grid":"320,166,1,1"
		},
		"xingcun_contentbg1":{
			"scale9grid":"50,50,1,1"
		},
		"xingcun_titlebg4":{
			"scale9grid":"80,16,1,1"
		},
		"acwifebathingview_detailbg-1":{
			"scale9grid":"320,250,1,1"
		},
		"ransackTraitor_progress":{
			"scale9grid":"11,7,1,1"
		},
		"ransackTraitor_progressbg":{
			"scale9grid":"11,7,1,1"
		},
		"ransackTraitor_bg2":{
			"scale9grid":"300,200,1,1"
		},
		"acredlotuswarrior_talkbg-1":{
			"scale9grid":"180,64,1,1"
		},
		"flipcard_bg06":{
			"scale9grid":"35,40,1,1"
		},
		"flipcard_progress":{
			"scale9grid":"5,8,1,1"
		},
		"flipcard_progressbg":{
			"scale9grid":"8,8,1,1"
		},
		"acwifebathingview_detaildescbg-1":{
			"scale9grid":"210,16,1,1"
		},
		"monopoly_bg6":{
			"scale9grid":"30,30,1,1"
		},
		"palace_progress":{
			"scale9grid":"12,13,1,1"
		},
		"palace_progressbg":{
			"scale9grid":"12,13,1,1"
		},
		"palace_titlebg6":{
			"scale9grid":"212,15,1,1"
		},
		"acwifeskininherit_talkbg-1":{
			"scale9grid":"30,30,1,1",
		},
		"progress_type4_bg":{
			"scale9grid":"9,7,1,1"
		},
		"progress_type4_yellow":{
			"scale9grid":"9,7,1,1"

		},
		"public_hb_bg02":{
			"scale9grid":"13,14,1,1"
		},
		"acthrowarrowview_progressbg":{
			"scale9grid":"8,8,1,1"
		},
		"wifebattlebattleview_blackbg":{
			"scale9grid":"5,19,1,1"
		},
		"wifebattlebattleview_bprogressbar":{
			"scale9grid":"3,13,1,1"
		},
		"wifebattlebattleview_bprogressbg":{
			"scale9grid":"7,13,1,1"
		},
		"wifebattlebattleview_sprogressbar":{
			"scale9grid":"2,11,1,1"
		},
		"wifebattlebattleview_sprogressbg":{
			"scale9grid":"5,11,1,1"
		},
		"wifebattlebattleview_select":{
			"scale9grid":"29,27,1,1"
		},
		"wifebattleview_talkbg":{
			"scale9grid":"40,50,1,1"
		},
		"wifebattlebattleview_wifenamebg":{
			"scale9grid":"172,44,1,1"
		},
		"wifebattlebattleview_wifenamefg":{
			"scale9grid":"178,56,1,1"
		},
		"wifebattlebattleview_skinnamebg":{
			"scale9grid":"155,30,1,1"
		},
		"acseasidegame_talkbg":{
			"scale9grid":"56,35,1,1",
		},
		"acarcadeview_usebg-1":{
			"scale9grid":"34,14,1,1",
		},
		"ransackTraitorSP_buildnamebg":{
			"scale9grid":"53,12,1,1",
		},
		"oneyearoverview_txtbg":{
			"scale9grid":"120,15,1,1",
		},"oneyearpack_progressbg":{
			"scale9grid":"10,14,1,1",
		},
		"acstargazer_changefb-1":{
			"scale9grid":"300,200,1,1"
		},
		"mainui_animask":{
			"scale9grid":"5,5,1,1"
		},
		"moonnight_talkbg-1":{
			"scale9grid":"74,34,1,1"
		},
		"atkracecross_namebg":{
			"scale9grid":"27,84,1,1"
		},
		"acredlotuswarrior-5_progress":{
			"scale9grid":"9,7,1,1"
		},
		"acredlotuswarrior-5_progressbg":{
			"scale9grid":"9,7,1,1"
		},
		"guideNameBg":{
			"scale9grid":"79,20,1,1"

		},
		"searchstoryview_btn":{
			"scale9grid":"114,30,1,1"
		},
		"searchstoryview_btn_down":{
			"scale9grid":"114,30,1,1"
		},
		"acarrowprogress_bg":{
			"scale9grid":"16,10,1,1"

		},
		"searchstoryview_namebg":{
			"scale9grid":"79,20,1,1"

		// },
		// "acredlotuswarrior_poem_bg":{
		// 	"scale9grid":"0,34,214,367"

		},
		"guide_tipbg":{
			"scale9grid":"15,15,1,1"

		},
		"createuser_textmask":{
			"scale9grid":"8,2,1,1",
		},
		"createuser_headmask":{
			"scale9grid":"0,0,1,1"
		},
		"commonview_border1":{
			"scale9grid":"30,15,1,1"
		},
		"commonview_border2":{
			"scale9grid":"50,20,1,1"
		},
		"popupview_bg5":{
			"scale9grid":"47,8,1,1"
		},
		"public_listbg3":{
			"scale9grid":"20,10,1,1"
		},
		"public_9v_bg12":{
			"scale9grid":"25,25,1,1"
		},
		"public_line4":{
			"scale9grid":"23,7,1,1"
		},
		"public_9v_bg13":{
			"scale9grid":"10,10,1,1"
		},
		"commonview_border3":{
			"scale9grid":"47,8,1,1"
		},
		"acGemExpendItemDescBg":{
			"scale9grid":"32,32,1,1"
		},
		"public_9v_bg14":{
			"scale9grid":"17,13,1,1"
		},
		"public_tc_srkbg06":{
			"scale9grid":"11,11,1,1"
		},
		"popupview_bg3":{
			"scale9grid":"273,60,1,1"
		},
		"searchbuild_bg2":{
			"scale9grid":"5,40,1,1"
		},
		"playerview_centerinfobg":{
			"scale9grid":"11,11,1,1"
		},
		"childview_talkbg":{
			"scale9grid":"73,50,1,1"
		},
		"childview_bottombg":{
			"scale9grid":"9,9,1,1"
		},
		"mainland_progressbg":{
			"scale9grid":"5,5,1,1"
		},
		"mainland_progressred":{
			"scale9grid":"5,5,1,1"
		},
		"mainland_progressgreen":{
			"scale9grid":"5,5,1,1"
		},
		"mainland_detailtab1_itemtitle":{
			"scale9grid":"36,10,1,1"
		},
		"mainland_detailtab1_itemround":{
			"scale9grid":"40,70,1,1"
		},
		"mainland_sendfight_itembg":{
			"scale9grid":"50,140,1,1"
		},
		
		
		"childview_talkbg_2":{
			"scale9grid":"130,40,1,1"
		},
		"challenge_officebg":{
			"scale9grid":"47,12,1,1"
		},
		"progress_type3_red":{
			"scale9grid":"5,10,1,1"
		},
		"rechargevie_border":{
			"scale9grid":"51,43,1,1"
		},
		"shopview_rewardbg":{
			"scale9grid":"10,10,1,1"
		},
		"accommontask_itemtitlebg":{
			"scale9grid":"40,10,1,1"
		},
		"activity_rank_itembg1":{
			"scale9grid":"304,60,1,1"
		},
		"activity_rank_itembg2":{
			"scale9grid":"304,60,1,1"
		},
		"fivetigers_progresscontent":{
			"scale9grid":"22,10,1,1"
		},
		"fivetigers_progressbg":{
			"scale9grid":"20,5,1,1"
		},
		"public_9v_bg15":{
			"scale9grid":"35,31,1,1"
		},
		"levy_numbg":{
			"scale9grid":"20,10,1,1"
		},
		"public_9_bg34":{
			"scale9grid":"20,19,1,1"
		},
		"guide_descbg":{
			"scale9grid":"45,30,1,1"
		},
		"mainui_taskbg170":{
			"scale9grid":"180,26,1,1"
		},
		"progress_type3_yellow2":{
			"scale9grid":"10,12,1,1"
		},
		"servant_skillbg1":{
			"scale9grid":"30,30,1,1"
		},
		"itemlistbg":{
			"scale9grid":"3,3,1,1"
		},
		"public_skilldetail_bg": {
			"scale9grid":"36,34,1,1"
		},
		"progress_atkhp0":{
			"scale9grid":"10,7,1,1"
		},
		"progress_atkhp1":{
			"scale9grid":"10,7,1,1"
		},
		"progress_atkhpbg":{
			"scale9grid":"10,7,1,1"
		},
		"servant_skillnamebg":{
			"scale9grid":"14,12,1,1"
		},
		"public_skillnamebg":{
			"scale9grid":"14,12,1,1"
		}
	};
}