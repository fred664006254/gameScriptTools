/**
 * author : qianjun
 * desc : 三国限时军需充值item
 */
class AcThreeKingdomsLimitChargeItem  extends ScrollListItem{
    private _rechargeItem : Config.AcCfg.ThreeKingdomsLimitRechargeCfg = null;
    
    public constructor()
    {
        super();
    }

    private get cfg() : Config.AcCfg.ThreeKingdomsCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcThreeKingdomsVo{
        return <AcThreeKingdomsVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    private get aid() : string{
        return AcConst.AID_THREEKINGDOMS;
    }

    private get code() : string{
        return this._code;
    }
    protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            default:
                code = `1`;
                break;
        }
        return code;
    }
    
    private _code : string = '';
	protected initItem(index:number,data:Config.AcCfg.ThreeKingdomsLimitRechargeCfg,itemparam:any)
    {	
        let view = this;
        view._code = itemparam;
		view.width = 605;
		view.height = 235 + 10;
        this._rechargeItem = data;//cfgObj.getChargeRewardById(this._itemData);
        //创建ui
        //背景图片
        let bg = BaseBitmap.create("public_scrollitembg");
        bg.width = view.width;
        bg.height = view.height - 10;
        this.addChild(bg);
        //消费红色标头   改变领取状态的时候需要更改这个图片
        let charge_redBg = BaseBitmap.create("shopview_itemtitle");
		charge_redBg.y = 0;
		charge_redBg.width = 250;
		this.addChild(charge_redBg);

        let Txt1 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        Txt1.text = LanguageManager.getlocal("acMayDayTotal_recharge",[String(this._rechargeItem.needGem)])
		Txt1.x = charge_redBg.x+20;
        Txt1.y = charge_redBg.y + 7;
        this.addChild(Txt1);

        let rewardBg = BaseBitmap.create("public_scrolllistbg");
		rewardBg.width = 420;
		rewardBg.height = 107;
		rewardBg.x = bg.x +15;
		rewardBg.y = charge_redBg.y + charge_redBg.height + 10;
		this.addChild(rewardBg);


        let str = `1045_1_${data.specialReward1}|1046_1_${data.specialReward2}`;
        let contentList = GameData.formatRewardItem(str);
        let reward = ""
		let scroStartY = rewardBg.y + 5;
        let tmpX = rewardBg.x+8;
		let deltaS = 1;
        for (let index = 0; index < contentList.length; index++) {
			let tmpData = contentList[index];
			let iconItem = GameData.getItemIcon(tmpData,true);
			iconItem.setScale(deltaS);
			iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width*deltaS+7);
			
            if (tmpX > rewardBg.x+ rewardBg.width -5)
            {
                tmpX = rewardBg.x+8;
                scroStartY += iconItem.height*deltaS + 5;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width*deltaS+7);
            }
			this.addChild(iconItem);
		}
        scroStartY += 113;
        rewardBg.height = scroStartY - rewardBg.y + 2;
        rewardBg.width = 240;
        bg.height = Math.max(236,rewardBg.y + rewardBg.height + 40);

        //进度条
        let progress = ComponentManager.getProgressBar("progress3","progress3_bg",420);
        progress.x = 15;
        // progress.y = 185;
        progress.y = scroStartY + 17;
        this.addChild(progress);

        let tmpVo = this.vo;
        let chargeTotal : number = tmpVo.getChargeNum();
        progress.setText(LanguageManager.getlocal("acCarnivalProgressText",[String(chargeTotal),data.needGem.toString()]));
        progress.setPercentage(chargeTotal / data.needGem);

        //检查是否创建已经领取标签
        if (tmpVo.isGetRecharge(data.id)){
            let collectFlag = BaseBitmap.create("collectflag")
            collectFlag.anchorOffsetX = collectFlag.width/2;
            collectFlag.anchorOffsetY = collectFlag.height/2;
            collectFlag.setScale(0.7);
            collectFlag.x = progress.x + progress.width + 80;
            collectFlag.y = progress.y + progress.height/2-10 ;
            this.addChild(collectFlag);
        }
        else{
            if(chargeTotal >= this._rechargeItem.needGem){
                let collectBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW,"ac_recharge_Btntxt2",()=>{
                    if(this.vo.et < GameData.serverTime){
                        App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
                        return;
                    }
                    if(!this.vo.isInChargeTime()){
                        App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsLimitChargeTimeTip2`, this.code)));
                        return;
                    }
                    this.vo.lastidx = data.id;
                    this.vo.lastpos = collectBtn.localToGlobal(collectBtn.width/2 + 50,20);
                    NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_RECHAGRERWD,{
                        activeId:this.acTivityId,
                        rkey:data.id
                    })
                },this);        
                collectBtn.x = progress.x + progress.width + 5;
                collectBtn.y = progress.y + progress.height/2 -collectBtn.height/2 ;
                this.addChild(collectBtn);
            }
            else{
                let chargeBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_RED,"acCarnivalToChargeBtnText",this.goRechargeHandler ,this);        
                chargeBtn.x = progress.x + progress.width + 10;
                chargeBtn.y = progress.y + progress.height/2 -chargeBtn.height/2 ;
                this.addChild(chargeBtn);
                if(!this.vo.isInChargeTime()){
                    chargeBtn.setGray(false);
                }
            }
        }
        // if (itemparam.id == data.id) {
		// 	let light = BaseBitmap.create("public_9_bg57")
		// 	light.width = bg.width + 10;
		// 	light.height = bg.height + 14;
		// 	light.setPosition(bg.x - 6, bg.y - 6);
		// 	this.addChild(light);
		// 	egret.Tween.get(light, { loop: true }).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500);
		// }

    }

    protected goRechargeHandler(event:egret.Event){
        if(!this.vo.isInActivity()){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        if(!this.vo.isInChargeTime()){
            App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsLimitChargeTimeTip2`, this.code)));
            return;
        }
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    }

    public getSpaceX():number
    {
        return 0;
    }
    /**
     * 不同格子Y间距
     */
    public getSpaceY():number
    {
        return 5;
    }
    public dispose():void{
        this._rechargeItem = null;
        // this._lastReqIdx = null;
        super.dispose();
    }
}