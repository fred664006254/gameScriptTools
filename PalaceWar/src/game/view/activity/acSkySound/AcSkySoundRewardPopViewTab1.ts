/**
 * 活动奖励
 * author wxz
 * date 2020.6.15
 * @class AcSkySoundRewardPopViewTab1
 */
class AcSkySoundRewardPopViewTab1 extends AcCommonViewTab{
    public _scrollList:ScrollList = null;
    private _botTxt1:BaseTextField=null;
    private _botTxt2:BaseTextField=null;
    private _botTxt3:BaseTextField=null;
    public constructor(){
        super();
        this.initView();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACSKYSOUND_EXCHANGE, this.requestCallback, this);

        let rewardBg = BaseBitmap.create("public_9_bg4");
        rewardBg.width = 530;
        rewardBg.height = 640;
        rewardBg.setPosition(25, 55);
        this.addChild(rewardBg);     

        let bot = BaseBitmap.create("public_9_bg1");
        bot.width = 530;
        bot.height = 60;
        bot.x = rewardBg.x;
        bot.y = rewardBg.y+rewardBg.height+5;
        this.addChild(bot);

        let dataList = this.vo.getSortExchangeCfg();
        let rect =  new egret.Rectangle(0, 0, 530, 628);
        let scrollList = ComponentManager.getScrollList(AcSkySoundRewardTab1ScrollItem, dataList, rect, {aid:this.aid, code:this.code});
        scrollList.setPosition(25, 62);
        this.addChild(scrollList);
        this._scrollList = scrollList;

        let nameArr = ["costSpecial2","costSpecial4","costSpecial8"];
        for(let i = 0; i < nameArr.length; i++)
        {
            let bgimg:BaseBitmap=BaseBitmap.create("public_9_resbg");
            bgimg.width = 120;
            if(i == 0)
            {
                bgimg.x = bot.x + 20;
                bgimg.y = bot.y + bot.height/2 - bgimg.height/2;
                this.addChild(bgimg);

                let img = BaseBitmap.create("acskysound_yf1-1");
                img.setScale(0.5);
                img.x = bgimg.x;
                img.y = bgimg.y + bgimg.height/2 - img.height*img.scaleY/2;
                this.addChild(img);

                this._botTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acskysound_numtxt",["0"]),20,TextFieldConst.COLOR_LIGHT_YELLOW);
                this._botTxt1.x = bgimg.x + 50;
                this._botTxt1.y = bgimg.y + bgimg.height/2 - this._botTxt1.height/2;
                this.addChild(this._botTxt1);
            }else if(i == 1)
            {
                bgimg.x = bot.x + bot.width/2 - bgimg.width/2;
                bgimg.y = bot.y + bot.height/2 - bgimg.height/2;
                this.addChild(bgimg);                

                let img = BaseBitmap.create("acskysound_yf2-1");
                img.setScale(0.5);
                img.x = bgimg.x;
                img.y = bgimg.y + bgimg.height/2 - img.height*img.scaleY/2;
                this.addChild(img);

                this._botTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acskysound_numtxt",["0"]),20,TextFieldConst.COLOR_LIGHT_YELLOW);
                this._botTxt2.x = bgimg.x + 50;
                this._botTxt2.y = bgimg.y + bgimg.height/2 - this._botTxt2.height/2;
                this.addChild(this._botTxt2);                
            }else if(i == 2)
            {
                bgimg.x = bot.x + bot.width - bgimg.width - 20;
                bgimg.y = bot.y + bot.height/2 - bgimg.height/2;
                this.addChild(bgimg);          

                let img = BaseBitmap.create("acskysound_yf3-1");   
                img.setScale(0.5);
                img.x = bgimg.x;
                img.y = bgimg.y + bgimg.height/2 - img.height*img.scaleY/2;
                this.addChild(img);

                this._botTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("acskysound_numtxt",["0"]),20,TextFieldConst.COLOR_LIGHT_YELLOW);
                this._botTxt3.x = bgimg.x + 50;
                this._botTxt3.y = bgimg.y + bgimg.height/2 - this._botTxt3.height/2;
                this.addChild(this._botTxt3);                   
            }
        }

        this.refreshView();  
    }

    private requestCallback(event:egret.Event){
        let rData = event.data.data.data;
        if(!rData){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        let replacerewards = rData.replacerewards;
        if (replacerewards) 
        {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
        }        
        let rewards = rData.rewards;
        if(rData.specialGift)
        {
            rewards = "1058_0_" + rData.specialGift + "_" + this.code + "|" + rewards;
        }        
        let rewardVoList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { replacerewards: rData.replacerewards });
        }
    }

    private refreshView():void{
        if (!this.vo){
            return;
        }
        let dataList = this.vo.getSortExchangeCfg();
        this._scrollList.refreshData(dataList, {aid:this.aid, code:this.code});

        let num = this.vo.getSpecialNum("costSpecial2");
        this._botTxt1.text = LanguageManager.getlocal("acskysound_numtxt",[String(num)]);

        num = this.vo.getSpecialNum("costSpecial4");
        this._botTxt2.text = LanguageManager.getlocal("acskysound_numtxt",[String(num)]);

        num = this.vo.getSpecialNum("costSpecial8");
        this._botTxt3.text = LanguageManager.getlocal("acskysound_numtxt",[String(num)]);
    }

	private get cfg():Config.AcCfg.SkySoundCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo():AcSkySoundVo{
        return <AcSkySoundVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

     public dispose(){
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACSKYSOUND_EXCHANGE, this.requestCallback, this);
        this._scrollList = null;
        this._botTxt1 = null;
        this._botTxt2 = null;
        this._botTxt3 = null;
        super.dispose();
     }
}