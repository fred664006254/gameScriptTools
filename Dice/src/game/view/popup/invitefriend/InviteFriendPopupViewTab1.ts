/**
 * 邀请好友tab1
 * author qianjun
 */
class InviteFriendPopupViewTab1 extends CommonViewTab{
    private _idx : number = -1;
    private _group : BaseDisplayObjectContainer = null;

	public constructor() {
		super();
		this.initView();
    }

    protected getNetConstEventArr():string[]{
		return [
            NetConst.INVITEFRIEND_GETREWARD
		];
	}

	protected netEventCallBack(evt : egret.Event):void{
		let view = this;
		switch(evt.type){
            case NetConst.INVITEFRIEND_GETREWARD:
                view.rewardCallback(evt);
                break;
		}
    }

    private get cfg(){
        return Config.InvitefriendCfg;
    }

    private get api(){
        return Api.InviteFriendVoApi;
    }

	public initView():void{
        let view = this;
        let api = view.api;
        let cfg = view.cfg;
        view.initEventListener();
        view.width = 500;
        view.height = 531;

        let codebg = BaseBitmap.create(`invitefriendcodebg`);
        codebg.width = 500;
        codebg.height = 174;
        view.addChild(codebg);

        let descTxt = ComponentMgr.getTextField(LangMger.getlocal(`invitefriendTip1`), TextFieldConst.SIZE_22, 0xCFDEFF);
        descTxt.stroke = 2;
        descTxt.strokeColor = 0x0C2C77;
		descTxt.lineSpacing = 13;
		descTxt.width = 270;
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, descTxt, codebg, [185 + (codebg.width - 185 - descTxt.width) / 2,22]);
        view.addChild(descTxt);
        
        let inviteTxt = ComponentMgr.getTextField(LangMger.getlocal(`invitefriendTip2`), TextFieldConst.SIZE_22, 0xFFFFFF);
        inviteTxt.stroke = 2;
        inviteTxt.strokeColor = 0x000000;
		App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, inviteTxt, codebg, [206,119]);
        view.addChild(inviteTxt);
        
        let kuang = BaseBitmap.create(`invitefriendcodekuang`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, kuang, inviteTxt, [inviteTxt.width+12,0]);
        view.addChild(kuang);

        let code = api.getMyCode();
        let codeTxt = ComponentMgr.getTextField(code, TextFieldConst.SIZE_30, 0x65EB95);
        codeTxt.stroke = 2;
        codeTxt.strokeColor = 0x007f2d;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, codeTxt, kuang, [0,3]);
        view.addChild(codeTxt);
        
        let scoreBg = BaseBitmap.create(`invitefriendscorebg`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scoreBg, codebg, [0,codebg.height+13]);
        view.addChild(scoreBg);

        let myscore = api.getMyScore();
        let scoreTxt = ComponentMgr.getTextField(LangMger.getlocal(`invitefriendTip3`, [`${myscore}`]), TextFieldConst.SIZE_22, 0xFFFFFF);
        scoreTxt.stroke = 2;
        scoreTxt.strokeColor = 0x000000;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scoreTxt, scoreBg);
        view.addChild(scoreTxt);
        
        //进度奖励
        let con = new BaseDisplayObjectContainer();
        view._group = con;

        let dx = 96;
        let maxNum = view.cfg.getRewardMaxNum();
        con.width = dx * maxNum + 45;
        con.height = 140;

        let alphabg = BaseBitmap.create("public_alphabg");
        con.addChild(alphabg);
        alphabg.width = con.width;
        alphabg.height = con.height;

        let pro = ComponentMgr.getProgressBar("userinfo_view_progress", "userinfo_view_bar", dx * maxNum);
        con.addChild(pro);
        let curid = api.getCurJinduId();
        let cur = 0;
		if(curid == 0){
			cur = 0;
		}
		else if(curid == cfg.getRewardMaxNum()){
			cur = con.width;
		}
		else{
			let curcfg : Config.InviteRewardItemCfg = cfg.getInviteRewardItemById(curid);
			let nextcfg : Config.InviteRewardItemCfg = cfg.getInviteRewardItemById(curid + 1);
			cur = curid * 100 + (api.getMyScore() - curcfg.needPoint) / ((nextcfg.needPoint - curcfg.needPoint)/100);
		}
        let per = cur / con.width;
        pro.setPercentage(per);
        pro.setPosition(0, 77);

        for(let index = 1; index <= maxNum; index++) {
            let slp = BaseBitmap.create("userinfo_view_top_split");
            con.addChild(slp);
            slp.setPosition(index * dx, pro.y);
            let cfg = view.cfg.getInviteRewardItemById(index);
            const item = this.createTopItem(index);
            con.addChild(item);
            item.setPosition(dx*(index), item.anchorOffsetY);
            // item.addTouchTap(this.boxOnclick, this, [index]);
            let numtxt = ComponentMgr.getTextField(`${cfg.needPoint}`, TextFieldConst.SIZE_22, ColorEnums.white);
            con.addChild(numtxt);
            numtxt.x = index * dx - numtxt.width / 2;
            numtxt.y = pro.y + pro.height + 5;
        }
        
		let scrollview = ComponentMgr.getScrollView(con, new egret.Rectangle(0,0,460,140));
		view.addChild(scrollview);
		scrollview.bounces = false;
		scrollview.horizontalScrollPolicy = 'on';
		scrollview.verticalScrollPolicy = 'off';
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollview, scoreBg, [0,scoreBg.height+16]);
        scrollview.setScrollLeft((curid - 1) * 96 , 500);
        
        let copyBtn = ComponentMgr.getButton(`invitefriendcopybtn`, LangMger.getlocal(`invitefriendTip4`), ()=>{
            //拷贝
            if(PlatMgr.checkIsUseSDK()){
                RSDK.copyToClipboard(code);
            }
            else{
                let input = document.createElement("input");
                input.value = code;
                input.readOnly = true;
                document.body.appendChild(input);
                input.select();
                input.setSelectionRange(0, input.value.length),
                document.execCommand('Copy');
                document.body.removeChild(input);
                App.CommonUtil.showTip(LangMger.getlocal("invitefriendTip9"));
            }
        }, view);
        view.addChild(copyBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, copyBtn, codebg, [45,codebg.height+248]);

        let shareBtn = ComponentMgr.getButton(`invitefriendsharebtn`, LangMger.getlocal(`invitefriendTip5`), ()=>{
            //调起分享
            App.ShareGuideUtil.shareBtnClickHandler();
        }, view);
        view.addChild(shareBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, shareBtn, codebg, [45,codebg.height+248]);
    }

    private createTopItem(index:number):BaseDisplayObjectContainer{
        let view = this;
        let item = new BaseDisplayObjectContainer();
        item.width = 68;
        item.height = 70;
        item.anchorOffsetX = item.width / 2;
        item.anchorOffsetY = item.height / 2;
        item.name = `item${index}`;
        
        let bg = BaseBitmap.create(`invitefriendrewardbg`);
        bg.setScale(0.55);
        item.addChild(bg);
        bg.name = `bg`;

        let itemVo = GameData.formatRewardItem(view.cfg.getInviteRewardItemById(index).getReward)[0];
        let iconstr = itemVo.icon;
        let icon = BaseLoadBitmap.create(iconstr, null, {callback : ()=>{
            icon.setScale(itemVo.type == 50 ? 0.18 : 0.38);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, icon, bg, [0,itemVo.type == 50 ? 0 : 7]);
        }, callbackThisObj : view});
        item.addChild(icon);
        icon.name = `icon`;

        let numTxt = ComponentMgr.getTextField(`x${itemVo.num}`, TextFieldConst.SIZE_16);
        item.addChild(numTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, numTxt, bg, [0,3]);

        if(view.api.isGetReward(index)){
            let flag = BaseBitmap.create(`royalgouhao`);
		    item.addChild(flag);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, flag, bg);
        }
        else{
            if(view.api.canGetInviteReward(index)){
                let lingpai= ComponentMgr.getCustomMovieClip( itemVo.type == 100? "firstrec_effect1_":"firstrec_effect2_", null, 120);
                lingpai.blendMode = egret.BlendMode.ADD;
                lingpai.playWithTime(0);
                item.addChild(lingpai);
                lingpai.anchorOffsetX = 190 / 2;
                lingpai.anchorOffsetY = 180 / 2;
                lingpai.setScale(0.7);
                lingpai.x = 33;
                lingpai.y = 33;
                lingpai.name = `lingpai`;

                item.addTouchTap(()=>{
                    view._idx = index;
                    NetManager.request(NetConst.INVITEFRIEND_GETREWARD, {
                        rkey : index+``
                    });
                }, view);
            }
        }
        item.addTouchTap(()=>{
            view.showDetails(itemVo)
        }, view);
        return item;
    }

    private rewardCallback(evt : egret.Event):void{
        let view = this;
        if(evt.data.ret){
            let rewards = evt.data.data.data.rewards;
            if(rewards){
                let itemVo = GameData.formatRewardItem(view.cfg.getInviteRewardItemById(view._idx).getReward)[0];
                if(itemVo.type == 50){
                    ViewController.getInstance().openView(ViewConst.GETREWARDPOPUPVIEW,{
                        rewards : rewards,
                        title : LangMger.getlocal(`sysGetReward`),
                        isBoxBuy : false,//连续购买模式
                        specialBoxId : itemVo.id,
                        handler : view,
                        needCancel : true,
                        closecallback : ()=>{
                            App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                        },
                    });
                    Api.ShopVoApi.setIsBox(false,``);
                } 
                else{
                    ViewController.getInstance().openView(ViewConst.COMMONREWARDPOPUPVIEW,{
                        rewards : rewards,
                        title : LangMger.getlocal(`sysGetReward`),
                        callback: ()=>{
                            App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                        }
                    });
                }

                let item = <BaseDisplayObjectContainer>view._group.getChildByName(`item${view._idx}`);
                if(item){
                    let bg = <BaseBitmap>item.getChildByName(`bg`);
                    if(bg){
                        let flag = BaseBitmap.create(`royalgouhao`);
                        item.addChild(flag);
                        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, flag, bg); 
                    }

                    let icon = <BaseBitmap>item.getChildByName(`icon`);
                    if(icon){
                        App.DisplayUtil.changeToGray(icon); 
                    }

                    let lingpai = <CustomMovieClip>item.getChildByName(`lingpai`);
                    if(lingpai){
                        lingpai.dispose();
                        lingpai = null;
                    }
                }
                view._idx = -1;
            }
        }
    }

    private showDetails(reward : RewardItemVo) {
        if (reward.type == 50) {
            ViewController.getInstance().openView(ViewConst.BOXREWARDDETAILPOPUPVIEW,{
                title : reward.name,
                needCancel : false,
                needClose : 1,
                boxId : reward.id,
            });
        } else if (reward.type == 1 || reward.type == 2) {
            ViewController.getInstance().openView(ViewConst.SIGNSHOWPOPVIEW, {
                title : reward.name,
                handler : null,
                needCancel : false,
                needClose : 1,
                param : reward,
                costnum :LangMger.getlocal("sysconfirm"),
                // costIcon : `ab_mainui_gem`
            });
        }
    }

    public dispose(){
        let view = this;
        view._idx = -1;
        view._group = null;
        super.dispose();
    }
}