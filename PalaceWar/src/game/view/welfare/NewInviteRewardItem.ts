/**
 * 新邀请有礼邀请任务item
 * author qianjun
 */
class NewInviteRewardItem extends ScrollListItem{

	public constructor() {
		super();
	}

	protected initItem(index:number,data:{data : any, type : string}){
		let view = this;
        view.width = 510;
        view.height = 240;

        let isinviteTask = data.type == `invite`;
        let bg = BaseBitmap.create("public_popupscrollitembg");
        bg.width = view.width;
        bg.height = view.height;
        view.addChild(bg);

        let titlebg = BaseBitmap.create("shopview_itemtitle");
        titlebg.width = 430;
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, titlebg, bg, [0,3]);
		view.addChild(titlebg);

        let cfg = data.data;
        let Txt1 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        Txt1.text = LanguageManager.getlocal(isinviteTask ? "newinvitetasktitle" : "newinvitepowertitle",[cfg.value.toString(),cfg.needPower]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, Txt1, titlebg, [12,0]);
        view.addChild(Txt1);

        let rewardBg = BaseBitmap.create("public_scrolllistbg");
		rewardBg.width = 480;
		rewardBg.height = 115;
		rewardBg.x = bg.x +15;
		rewardBg.y = titlebg.y + titlebg.height + 8;
		view.addChild(rewardBg);

        let str = cfg.getReward;
        let contentList = GameData.formatRewardItem(str);
        let reward = ""
		let scroStartY = rewardBg.y + 10;
        let tmpX = rewardBg.x + 10;
		let deltaS = 0.8;
        for (let index = 0; index < contentList.length; index++) {
			let tmpData = contentList[index];
			let iconItem = GameData.getItemIcon(tmpData,true);
			iconItem.setScale(deltaS);
			iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width*deltaS+7);
			
            if (tmpX > (rewardBg.x+ rewardBg.width))
            {
                tmpX = rewardBg.x + 10;
                scroStartY += iconItem.height*deltaS + 5;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width*deltaS+10);
            }
			view.addChild(iconItem);
		}
        scroStartY += 98;
		rewardBg.height = scroStartY - rewardBg.y + 2;
        bg.height = rewardBg.y + rewardBg.height + 80;
        view.height = bg.height + 5;

        //进度条
        let progress = ComponentManager.getProgressBar("progress21","progress21_bg",330);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, progress, rewardBg, [0,rewardBg.height+20]);
        view.addChild(progress);

        let tmpVo = Api.newinviteVoApi;
        let friendnum : number = data.type == `invite` ? tmpVo.getInviteFriendNum() : tmpVo.getInvitePowerNum(cfg.needPower);
        progress.setText(`${friendnum}/${cfg.value}`);
        progress.setPercentage(friendnum / cfg.value);

        //检查是否创建已经领取标签
        let flag = false;
        if(data.type == `invite`){
            flag = tmpVo.isGetInviteFriendTask(cfg.id)
        }
        else{
            flag = tmpVo.isGetInvitePowerTask(cfg.id)
        }
        if(flag){
            let collectFlag = BaseBitmap.create("collectflag")
            collectFlag.anchorOffsetX = collectFlag.width/2;
            collectFlag.anchorOffsetY = collectFlag.height/2;
            collectFlag.setScale(0.7);
            collectFlag.x = progress.x + progress.width + 15 + collectFlag.anchorOffsetX;
            collectFlag.y = progress.y + progress.height / 2;
            view.addChild(collectFlag);
        }
        else{
            let collectBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW,"realnamedes6",()=>{
                if(friendnum < cfg.value){
                    App.CommonUtil.showTip(LanguageManager.getlocal(`newinvitetasktip${isinviteTask?1:2}`));
                    return;
                }
                tmpVo.lastidx = cfg.id;
                tmpVo.lastpos = collectBtn.localToGlobal(collectBtn.width/2 + 50,20);
                if(isinviteTask){
                    NetManager.request(NetRequestConst.REQUEST_NEWINVITE_GETINVITEREWARD,{
                        ikey:cfg.id
                    })
                }
                else{
                    NetManager.request(NetRequestConst.REQUEST_NEWINVITE_GETPOWERREWARD,{
                        ikey:cfg.id
                    })
                }
               
            },this);        
            collectBtn.x = progress.x + progress.width + 20;
            collectBtn.y = progress.y + progress.height/2 -collectBtn.height/2 ;
            view.addChild(collectBtn);
            collectBtn.setGray(friendnum < cfg.value);
        }
	}
    
	public dispose():void{
		super.dispose();
	}
}