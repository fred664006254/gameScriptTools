/**
 * author yanyuling
 */
class AcWifeSkinInheritRewardPopupView  extends PopupView
{
    private code:string;
    private aid:string;
	public initView():void
	{
        this.aid = this.param.data.aid;
        this.code = this.param.data.code;
        //
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_HULAOREDEEMSKIN),this.exchangeCallback,this);
        let _acvo:AcWifeSkinInheritVo =  <AcWifeSkinInheritVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
         let config = _acvo.config;

        let bg1= BaseBitmap.create("public_tc_bg01");
        bg1.width = 540;
        bg1.height = 230;
        bg1.x =42;
        bg1.y =70;
        this.addChildToContainer(bg1);

        let bg2= BaseBitmap.create("public_tc_bg03");
        bg2.width = bg1.width - 20;
        bg2.height = bg1.height - 80;
        bg2.x =bg1.x + 10;
        bg2.y =bg1.y + 60;
        this.addChildToContainer(bg2);
        let boxcfg = config.FireNum[this.param.data.boxid-1];
        let getReward = boxcfg.getReward;
        let needNum = boxcfg.needNum;
        let curNum = _acvo.lotterysnum;
        let n = needNum > curNum? needNum - curNum:0;
        // 1->宝箱关闭 ,2->可以领取宝箱, 3->已经打开宝箱
        // let status = _acvo.getBoxStatusById(this.param.data.boxid-1);
        let txt = "";
        if(n >0){
            txt = LanguageManager.getlocal(this.getDefaultCn("acWifeSkinInheritReward_detail"),[String(n)]);
        } else {
            txt = LanguageManager.getlocal(this.getDefaultCn("acWifeSkinInheritReward_detail2"));
        }
        //详情描述
        let txt1  = ComponentManager.getTextField(txt, 20,TextFieldConst.COLOR_BROWN);
		txt1.x = this.viewBg.width/2 - txt1.width/2;
		txt1.y = 20;
		this.addChildToContainer(txt1);

       
        //谢礼:
        let txt3  = ComponentManager.getTextField(LanguageManager.getlocal(this.getDefaultCn("acWifeSkinInheritRewardPopupViewT")), 20,TextFieldConst.COLOR_LIGHT_YELLOW);
		txt3.x = bg1.x + 20;
		txt3.y = bg1.y + 20;
		this.addChildToContainer(txt3);

        // let rewardbg= BaseBitmap.create("public_tc_bg01");
        // rewardbg.width = 500;
        // rewardbg.height =160
        // rewardbg.x = bg1.x + 20;
        // rewardbg.y = titlebg2.y + titlebg2.height + 20;
        // this.addChildToContainer(rewardbg);

      
        if(this.param.data.boxid == 5){
            getReward = boxcfg.getReward + "|" + config.FireReward
        }
		let rewardIcons = GameData.getRewardItemIcons(getReward,true);
        let starY = bg2.y + 25;
        for (var index = 0; index < rewardIcons.length; index++) {
            var element = rewardIcons[index];
            element.x = (element.width + 10) * (index%4) + bg2.x + 30;
            element.y = starY;
            if(index %4 == 0 && index > 0){
                starY = starY + element.height+10;
                element.y = starY;
                bg2.height = starY - bg2.y + element.height + 15;
            }
            this.addChildToContainer(element);
        }
        
        // let tipTxt =  ComponentManager.getTextField(LanguageManager.getlocal("acWifeSkinInheritReward_storytxt3",[""+boxcfg.needNum]), 20,TextFieldConst.COLOR_WARN_RED2);
		// if(this.param.data.boxid == 5){
        //     tipTxt.text = LanguageManager.getlocal("acWifeSkinInheritReward_storytxt5",[""+boxcfg.needNum])
        // }
        // tipTxt.x = bg2.x + bg2.width/2 - tipTxt.width/2;
		// tipTxt.y = rewardbg.y + rewardbg.height + 35;
		// this.addChildToContainer(tipTxt);

        //  bg2.height =  tipTxt.y + tipTxt.height - bg2.y + 20;  
         bg1.height = bg2.height + 80
    }

    protected getDefaultCn(cnName:string,defaultCode?:string):string
    {
        defaultCode = defaultCode||"1";
        if(LanguageManager.checkHasKey(cnName+"-"+this.code)){
            return cnName + "-" + this.code;
        } else {
            return cnName + "-" + defaultCode;
        }
    }
    protected getTitleStr():string
	{
		return "acWifeSkinInheritRewardPopupViewTitle";
	}

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
		]);
	}

    public dispose()
    {
        super.dispose()
    }
}