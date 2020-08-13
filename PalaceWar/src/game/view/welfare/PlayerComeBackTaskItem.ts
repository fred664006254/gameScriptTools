/**
 * 新邀请有礼邀请任务item
 * author qianjun
 */
class PlayerComeBackTaskItem extends ScrollListItem{

	public constructor() {
		super();
	}

	protected initItem(index:number,data:{data : any, type : string},itemparam){
		let view = this;
        view.width = 480;
        view.height = 225;

        let isinviteTask = data.type == `invite`;
        let bg = BaseBitmap.create("newinvitelistbg2");
        bg.width = view.width;
        bg.height = view.height;
        view.addChild(bg);

        let titlebg = BaseBitmap.create("public_titlebg");
        titlebg.width = 450;
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, titlebg, bg, [15,15]);
		view.addChild(titlebg);

        let cfg : Config.ComebackTaskCfg = data.data;
        let Txt1 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        Txt1.text = LanguageManager.getlocal(isinviteTask ? "playercomebacktasktitle" : "newinvitepowertitle",[cfg.needGem.toString()]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, Txt1, titlebg, [12,0]);
        view.addChild(Txt1);

        // let box = BaseBitmap.create("newinviterewardbox");
        // box.addTouchTap(()=>{
        //     ViewController.getInstance().openView(ViewConst.POPUP.PLAYERCOMEBACKREWARDPOPUPVIEW,{
        //         isinviteTask : isinviteTask
        //     });
        // }, view);
        let box = ComponentManager.getButton("newinviterewardbox",null,()=>{
            ViewController.getInstance().openView(ViewConst.POPUP.PLAYERCOMEBACKREWARDPOPUPVIEW,{
                isinviteTask : isinviteTask
            });
        }, view);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, box, titlebg, [titlebg.width-box.width/2-30,0]);
        view.addChild(box);
        box.visible = !itemparam;

        let rewardBg = BaseBitmap.create("public_9_managebg");
		rewardBg.width = 443;
		rewardBg.height = 100;
		rewardBg.x = bg.x + 20;
		rewardBg.y = titlebg.y + titlebg.height + 8;
		view.addChild(rewardBg);

        let str = cfg.getReward;
        let contentList = GameData.formatRewardItem(str);
        let reward = ""
		let scroStartY = rewardBg.y + 7;
        let tmpX = rewardBg.x + 7;
		let deltaS = 0.74;
        for (let index = 0; index < contentList.length; index++) {
			let tmpData = contentList[index];
			let iconItem = GameData.getItemIcon(tmpData,true);
			iconItem.setScale(deltaS);
			iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width*deltaS+7);
			
            if (tmpX > (rewardBg.x+ rewardBg.width))
            {
                tmpX = rewardBg.x + 7;
                scroStartY += iconItem.height*deltaS + 5;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width*deltaS+7);
            }
			view.addChild(iconItem);
		}
        scroStartY += 90;
		rewardBg.height = scroStartY - rewardBg.y + 2;
        bg.height = rewardBg.y + rewardBg.height + 70;

        //进度条
        let progress = ComponentManager.getProgressBar("progress21","progress21_bg",260);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, progress, rewardBg, [0,rewardBg.height+20]);
        view.addChild(progress);

        let tmpVo = Api.newrebackVoApi;
        let friendnum : number = data.type == `invite` ? tmpVo.getInviteFriendNum() : 0;
        progress.setText(`${friendnum}/${cfg.needGem}`);
        progress.setPercentage(friendnum / cfg.needGem);

        //检查是否创建已经领取标签
        let flag = false;
        if(data.type == `invite`){
            flag = tmpVo.isGetInviteFriendTask(cfg.id)
        }
        if(flag){
            let collectFlag = BaseBitmap.create("collectflag")
            collectFlag.anchorOffsetX = collectFlag.width/2;
            collectFlag.anchorOffsetY = collectFlag.height/2;
            collectFlag.setScale(0.7);
            collectFlag.x = progress.x + progress.width + 30 + collectFlag.anchorOffsetX;
            collectFlag.y = progress.y + progress.height / 2;
            view.addChild(collectFlag);
        }
        else{
            let collectBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW,"realnamedes6",()=>{
                if(friendnum < cfg.needGem){
                    App.CommonUtil.showTip(LanguageManager.getlocal(`playercomebacktasktip${isinviteTask?1:2}`));
                    return;
                }
                tmpVo.lastidx = cfg.id;
                tmpVo.lastpos = collectBtn.localToGlobal(collectBtn.width/2 + 10,20);
                if(isinviteTask){
                    NetManager.request(NetRequestConst.REQUEST_REBACK_GETINVITEREWARD,{
                        ikey:cfg.id
                    })
                }             
            },this);        
            collectBtn.x = progress.x + progress.width + 50;
            collectBtn.y = progress.y + progress.height/2 -collectBtn.height/2 ;
            view.addChild(collectBtn);
            collectBtn.setGray(friendnum < cfg.needGem);
        }
	}
    
	public dispose():void{
		super.dispose();
	}
}