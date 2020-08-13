var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 姻缘记录item
 * author 钱竣
 */
var AdultYinYuanRecordScrollItem = (function (_super) {
    __extends(AdultYinYuanRecordScrollItem, _super);
    function AdultYinYuanRecordScrollItem() {
        var _this = _super.call(this) || this;
        _this._arrow1 = null;
        _this._list1 = null;
        return _this;
    }
    //{total:number,fatherName:string,et:number,id:number,aquality:number,st:number,name:string,uid:number,sex:number}
    AdultYinYuanRecordScrollItem.prototype.initItem = function (index, data) {
        var view = this;
        view._data = data;
        view.width = 520;
        var separate1 = BaseBitmap.create('friends_seprate_bg');
        separate1.width = 520;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, separate1, view, [0, 7]);
        view.addChild(separate1);
        separate1.addTouchTap(view.arrow1click, view);
        var arrow1 = BaseBitmap.create('friends_arrow2');
        arrow1.anchorOffsetX = arrow1.width / 2;
        arrow1.anchorOffsetY = arrow1.height / 2;
        arrow1.rotation = data.show ? 0 : 180;
        var qinjiaTxt = ComponentManager.getTextField(LanguageManager.getlocal("adultyinyuanrecordTitle" + (data.index + 1)), 22, TextFieldConst.COLOR_WHITE);
        var param1 = (separate1.width - arrow1.width - qinjiaTxt.textWidth - 5) / 2;
        view._arrow1 = arrow1;
        this.setLayoutPosition(LayoutConst.leftverticalCenter, qinjiaTxt, separate1, [param1, 0]);
        this.addChild(qinjiaTxt);
        this.setLayoutPosition(LayoutConst.lefttop, arrow1, qinjiaTxt, [qinjiaTxt.textWidth + 5 + arrow1.width / 2, arrow1.height / 2]);
        this.addChild(arrow1);
        var empTxt = ComponentManager.getTextField(LanguageManager.getlocal("acPunishNoData"), 22, TextFieldConst.COLOR_WHITE);
        this.addChild(empTxt);
        empTxt.visible = false;
        if (data.show) {
            var info = Api.adultVoApi.getALlMarryPlayerInfo();
            var arr = [];
            for (var i = 0; i < info[data.param].length; ++i) {
                var unit = info[data.param][i];
                arr.push({
                    uid: unit.uid,
                    name: unit.name,
                    pic: unit.pic,
                    level: unit.level,
                    power: unit.power,
                    mygname: unit.mygname,
                    offtime: unit.olt,
                    type: data.type,
                    friend: unit.friend,
                    title: unit.ptitle,
                    childid: data.childid
                });
            }
            arr.sort(function (a, b) {
                if (data.param == 'notsadun') {
                    var lynuma = Api.adultVoApi.getLyinnum(a.uid);
                    var lynumb = Api.adultVoApi.getLyinnum(b.uid);
                    if (lynuma == lynumb) {
                        if (a.power == b.power) {
                            return a.uid - b.uid;
                        }
                        else {
                            return b.power - a.power;
                        }
                    }
                    else {
                        return lynumb - lynuma;
                    }
                }
                else {
                    var baifanga = Api.adultVoApi.isUidVisited(a.uid);
                    var baifangb = Api.adultVoApi.isUidVisited(b.uid);
                    var laifanga = Api.adultVoApi.isLaifang(a.uid);
                    var laifangb = Api.adultVoApi.isLaifang(b.uid);
                    var hufanga = laifanga && baifanga;
                    var hufangb = laifangb && baifangb;
                    if (a.offtime && a.offtime != b.offtime) {
                        return b.offtime - a.offtime;
                    }
                    if (hufanga && hufangb) {
                        if (a.friend == b.friend) {
                            return b.power - a.power;
                        }
                        else {
                            return b.friend - a.friend;
                        }
                    }
                    else if (hufanga && !hufangb) {
                        return -1;
                    }
                    else if (!hufanga && hufangb) {
                        return 1;
                    }
                    else {
                        if (baifanga && baifangb) {
                            if (a.friend == b.friend) {
                                return b.power - a.power;
                            }
                            else {
                                return b.friend - a.friend;
                            }
                        }
                        else if (baifanga && !baifangb) {
                            return -1;
                        }
                        else if (!baifanga && baifangb) {
                            return 1;
                        }
                        else {
                            if (laifanga && laifangb) {
                                if (a.friend == b.friend) {
                                    return b.power - a.power;
                                }
                                else {
                                    return b.friend - a.friend;
                                }
                            }
                            else if (laifanga && !laifangb) {
                                return -1;
                            }
                            else if (!laifanga && laifangb) {
                                return 1;
                            }
                            else {
                                if (a.friend == b.friend) {
                                    return b.power - a.power;
                                }
                                else {
                                    return b.friend - a.friend;
                                }
                            }
                        }
                    }
                    // return b.friend - a.friend;
                }
            });
            var tmpRect = new egret.Rectangle(0, 0, 520, arr.length * 132);
            var scrollList = ComponentManager.getScrollList(AdultPlayerInfoScrollItem, arr, tmpRect);
            view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, separate1, [0, separate1.height]);
            //scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData") );
            view.addChild(scrollList);
            view._list1 = scrollList;
            empTxt.visible = arr.length == 0;
        }
        if (empTxt.visible) {
            this.setLayoutPosition(LayoutConst.horizontalCentertop, empTxt, separate1, [0, separate1.height + 6]);
        }
        else {
            this.height -= 5;
        }
        // let view = this;
        // view._data = data;
        // view.width = 520;
        // if(data.start){
        // 	let separate1 = BaseBitmap.create('friends_seprate_bg');
        // 	separate1.width = 520;
        // 	view.setLayoutPosition(LayoutConst.horizontalCentertop, separate1, view, [0, 7]);
        // 	view.addChild(separate1);
        // 	separate1.addTouchTap(view.arrow1click, view);
        // 	let arrow1 = BaseBitmap.create('friends_arrow2');
        // 	arrow1.anchorOffsetX = arrow1.width / 2;
        // 	arrow1.anchorOffsetY = arrow1.height / 2;
        // 	arrow1.rotation = data.show ? 0 : 180;
        // 	let qinjiaTxt = ComponentManager.getTextField(LanguageManager.getlocal(`adultyinyuanrecordTitle${data.param == 'sadun' ? 1 : 2}`), 22, TextFieldConst.COLOR_WHITE);
        // 	let param1 = (separate1.width - arrow1.width - qinjiaTxt.textWidth - 5) / 2;
        // 	view._arrow1 = arrow1;
        // 	this.setLayoutPosition(LayoutConst.leftverticalCenter, qinjiaTxt, separate1, [param1, 0]);
        // 	this.addChild(qinjiaTxt);
        // 	this.setLayoutPosition(LayoutConst.lefttop, arrow1, qinjiaTxt, [qinjiaTxt.textWidth + 5 + arrow1.width / 2, arrow1.height / 2]);
        // 	this.addChild(arrow1);
        // 	if(data.empty1 || data.empty2){
        // 		let empTxt = ComponentManager.getTextField(LanguageManager.getlocal('acPunishNoData'), 20, TextFieldConst.COLOR_BLACK);
        // 		this.setLayoutPosition(LayoutConst.horizontalCentertop, empTxt, view, [0,65]);
        // 		this.addChild(empTxt);
        // 	}
        // // }
        // if(data.show){
        // 	let info = Api.adultVoApi.getALlMarryPlayerInfo();
        // 	let arr = [];
        // 	for(let i = 0; i < info[data.param].length; ++ i){
        // 		// let unit = view.cfg.odds[i];
        // 		arr.push({
        // 			uid : 1,
        // 			name : "拉拉手老地方",
        // 			pic : 1,
        // 			level : 2,
        // 			power : 109019,
        // 			mygname : '',
        // 			offtime : 0,//olt
        // 			type : data.type,
        // 			friend : 1092,
        // 			title : Math.random() > 0.5 ? '4001' : ''
        // 		});
        // 	}
        // 	let tmpRect =  new egret.Rectangle(0,0,520,arr.length * 132);
        // 	let scrollList = ComponentManager.getScrollList(AdultPlayerInfoScrollItem, arr, tmpRect);
        // 	view.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, separate1, [0, separate1.height]);
        // 	view.addChild(scrollList);
        // 	view._list1 = scrollList; 
        // }
        // else{
        // 	if(data.show){
        // 		// childInfo.total
        // 		let bg:BaseBitmap = BaseBitmap.create("public_9_bg14");
        // 		bg.width = this.width;
        // 		bg.height = 130;
        // 		this.addChild(bg);
        // 		this.setLayoutPosition(LayoutConst.horizontalCentertop, bg, this, [data.start ? 60 : 0]);
        // 		let iconContainer = new BaseDisplayObjectContainer();
        // 		this.addChild(iconContainer);
        // 		let posBg : BaseBitmap = BaseBitmap.create(data.title == '' ? 'public_chatheadbg' : Api.playerVoApi.getVipHeadBgByTitle(data.title));
        // 		iconContainer.addChild(posBg)
        // 		let rect1:egret.Rectangle=egret.Rectangle.create();
        // 		rect1.setTo(0,0,136,143);
        // 		let posBB = BaseLoadBitmap.create(Api.playerVoApi.getUserHeadImgPathById(data.pic),rect1);
        // 		posBB.x = 0;
        // 		posBB.y =-7;
        // 		posBB.setScale(2/3);
        // 		iconContainer.addChild(posBB);
        // 		App.CommonUtil.addTouchScaleEffect(iconContainer,this.clickItemHandler,this);
        // 		let nameStr = data.name;
        // 		let nameTf = ComponentManager.getTextField(nameStr,TextFieldConst.FONTSIZE_CONTENT_COMMON, 0xa87e00);
        // 		this.setLayoutPosition(LayoutConst.lefttop, nameTf, bg, [iconContainer.x + iconContainer.width + 20,10]);
        // 		this.addChild(nameTf);
        // 		this.setLayoutPosition(LayoutConst.leftverticalCenter, iconContainer, bg, [15,4]);
        // 		let lineImg = BaseBitmap.create("public_line1");
        // 		lineImg.width = 400;
        // 		this.setLayoutPosition(LayoutConst.lefttop, lineImg, nameTf, [-10,nameTf.textHeight + 5]);
        // 		this.addChild(lineImg);
        // 		let leadStr = LanguageManager.getlocal("allianceMemberInfo1",[ data.power]);
        // 		let leadTF = ComponentManager.getTextField(leadStr,18,TextFieldConst.COLOR_BROWN);
        // 		leadTF.x = 120;
        // 		leadTF.y = nameTf.y + nameTf.height + 14;
        // 		this.addChild(leadTF);
        // 		let attrStr = LanguageManager.getlocal("allianceMemberInfo2",[Api.playerVoApi.getPlayerOfficeByLevel(data.level)]);
        // 		let attrTF = ComponentManager.getTextField(attrStr,18,TextFieldConst.COLOR_BROWN);
        // 		attrTF.x = 120;
        // 		attrTF.y = leadTF.y + leadTF.height + 7;
        // 		this.addChild(attrTF);
        // 		let conStr = LanguageManager.getlocal("chatblockAlliance",[data.mygname == '' ? LanguageManager.getlocal('nothing') : data.mygname]);
        // 		let conrTF = ComponentManager.getTextField(conStr,18,TextFieldConst.COLOR_BROWN);
        // 		conrTF.x = 120;
        // 		conrTF.y = attrTF.y + attrTF.height + 7;
        // 		this.addChild(conrTF);
        // 		let timeDis = GameData.serverTime - data.offtime;
        // 		let timeStr = LanguageManager.getlocal(timeDis <= 0 ? "chatblockonline" : "chatblockoffline",[App.DateUtil.getFormatBySecond(timeDis,4)]);
        // 		if(timeStr == LanguageManager.getlocal('chat_time4')){
        // 			timeStr = LanguageManager.getlocal('chat_time3', ['1'])
        // 		}
        // 		else{
        // 			//timeStr = timeStr.substring(0, timeStr.length - 1);
        // 		}
        // 		let timeTF = ComponentManager.getTextField(timeStr,18,TextFieldConst.COLOR_BROWN);
        // 		timeTF.setColor(timeDis <= 0 ? TextFieldConst.COLOR_WARN_GREEN :  0x858583);
        // 		timeTF.visible = false;
        // 		// timeTF.x = 120;
        // 		// timeTF.y = conrTF.y + conrTF.height + 7;
        // 		// timeTF.x = this.width - timeTF.width - 25;
        // 		// // timeTF.textColor = textColor;
        // 		// timeTF.y = this._nameTf.y;
        // 		let quitBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"",this.cancelBlock,this);
        // 		this.setLayoutPosition(LayoutConst.rightbottom, quitBtn, bg, [20, 10]);
        // 		this.addChild(quitBtn);
        // 		quitBtn.setColor(TextFieldConst.COLOR_BLACK);
        // 		this.setLayoutPosition(LayoutConst.horizontalCentertop, timeTF, quitBtn, [0, -timeTF.textHeight - 40]);
        // 		this.addChild(timeTF);
        // 		quitBtn.visible = false;
        // 		//新增亲家
        // 		let info = Api.adultVoApi.getFreiendNums(this._data.uid);
        // 		let progress = null;
        // 		let friendnum = null;
        // 		let lynumTxt = null;
        // 		if(Api.adultVoApi.judgeIsSudan(this._data.uid)){
        // 			progress = ComponentManager.getProgressBar("progress3","progress3_bg",102);
        // 			this.setLayoutPosition(LayoutConst.rightbottom, progress, bg, [30,20]);
        // 			this.addChild(progress);
        // 			progress.setPercentage(info.percent, LanguageManager.getlocal(`adultFriendDesc${info.quality}`), TextFieldConst.COLOR_WHITE);
        // 			friendnum = ComponentManager.getTextField(LanguageManager.getlocal('adultLyinFriendNums',[info.num.toString()]), 20, TextFieldConst.COLOR_BLACK);
        // 			this.setLayoutPosition(LayoutConst.horizontalCentertop, friendnum, progress, [0,-friendnum.textHeight - 5]);
        // 			this.addChild(friendnum);
        // 		}
        // 		else{
        // 			lynumTxt = ComponentManager.getTextField(LanguageManager.getlocal('adultLyinNums',[Api.adultVoApi.getLyinnum(this._data.uid).toString()]), 20, TextFieldConst.COLOR_BLACK);
        // 			this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, lynumTxt, quitBtn, [0,-15]);
        // 			this.addChild(lynumTxt);
        // 		}
        // 		if(data.type == 'marry'){
        // 			this.setLayoutPosition(LayoutConst.rightbottom, quitBtn, this, [20,15]);
        // 			quitBtn.visible = true;
        // 			quitBtn.setText('adultMarry');
        // 			if(progress){
        // 				progress.visible = false;
        // 			}
        // 			if(lynumTxt){
        // 				this.setLayoutPosition(LayoutConst.horizontalCentertop, lynumTxt, quitBtn, [0,-lynumTxt.textHeight-3]);
        // 			}
        // 			else if(friendnum){
        // 				this.setLayoutPosition(LayoutConst.horizontalCentertop, friendnum, quitBtn, [0,-friendnum.textHeight-3]);
        // 			}
        // 		}
        // 	}
        //}
    };
    AdultYinYuanRecordScrollItem.prototype.arrow1click = function () {
        var view = this;
        var list = view.parent.parent;
        var arr = list._dataList;
        // for(let i = 0; i < 2; ++ i){
        //     // let unit = view.cfg.odds[i];
        //     arr.push({
        // 		index : Number(i),
        // 		param : i == 0 ? 'sadun' : 'notsadun',
        // 		type : view._data.type,
        // 		show : true
        //     });
        // }
        if (view._arrow1.rotation == 0) {
            view._arrow1.rotation = 180;
        }
        else {
            view._arrow1.rotation = 0;
        }
        for (var i in arr) {
            var show = view._arrow1.rotation == 0;
            if (arr[i].param == this._data.param) {
                arr[i].show = show;
            }
        }
        // arr[view._data.index].show = view._arrow1.rotation == 0;
        list.refreshData(arr);
    };
    AdultYinYuanRecordScrollItem.prototype.clickItemHandler = function (event) {
        this.showUserInfo();
    };
    AdultYinYuanRecordScrollItem.prototype.showUserInfo = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
        NetManager.request(NetRequestConst.REQUEST_RANK_USERSHOT, { ruid: this._data.uid });
    };
    AdultYinYuanRecordScrollItem.prototype.cancelBlock = function () {
        var data = this._data;
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ADULT_CHOOSE_SADUNMARRY, { "fuid": this._data.uid, "childId": this._data.id });
    };
    AdultYinYuanRecordScrollItem.prototype.userShotCallback = function (event) {
        var data = event.data.data.data;
        // if(String(data.ruid) == this._chatData.sender)
        // {
        ViewController.getInstance().openView(ViewConst.POPUP.RANKUSERINGOPOPUPVIEW, data);
        // }
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RANK_USERSHOT), this.userShotCallback, this);
    };
    AdultYinYuanRecordScrollItem.prototype.dispose = function () {
        this._data = null;
        if (this._arrow1) {
            this._arrow1.removeTouchTap();
            this._arrow1 = null;
        }
        if (this._list1) {
            this._list1 = null;
        }
        _super.prototype.dispose.call(this);
    };
    return AdultYinYuanRecordScrollItem;
}(ScrollListItem));
__reflect(AdultYinYuanRecordScrollItem.prototype, "AdultYinYuanRecordScrollItem");
//# sourceMappingURL=AdultYinYuanRecordScrollItem.js.map