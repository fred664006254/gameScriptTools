/**
 * 奖励弹窗
 * author qianjun
 */
class CouncilRewardPopupView extends CommonView
{
    public constructor() {
		super();
    }

    private get api(){
        return Api.councilVoApi;
    }

    protected getBgName():string{
        return null;
    }

    protected getCloseBtnName():string{
        return null;
    }

    protected getTitleBgName():string{
        return null;
    }

    protected getTitleStr():string{
        return null;
    }

    protected initView():void
	{
        let view = this;
        let data = this.param.data; 
        let bottomBg = BaseBitmap.create("public_9_wordbg2");
        bottomBg.height = 250;
        if(PlatformManager.checkIsEnLang())
        {
            bottomBg.height = 300;
        }
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, bottomBg, view);
        view.addChild(bottomBg);

        let titlePic = BaseBitmap.create("discusssuccess");
        view.setLayoutPosition(LayoutConst.horizontalCentertop, titlePic, bottomBg, [0,-titlePic.height/2]);
        view.addChild(titlePic);

        let tip1 = BaseBitmap.create("discusstip1");
        let tip2 = BaseBitmap.create("discusstip2");
        let eventNameTxt = ComponentManager.getTextField(LanguageManager.getlocal(`discussViewEventName${data.eventId}_${data.randevent}`), 20);
        let rankTxt = ComponentManager.getTextField(data.rank, 20);
        let rectWidth = (bottomBg.width - (tip1.width + tip2.width + eventNameTxt.textWidth + 10 + 10)) / 2;
        view.setLayoutPosition(LayoutConst.lefttop, tip1, bottomBg, [rectWidth,60]);
        view.addChild(tip1);
        
        view.setLayoutPosition(LayoutConst.lefttop, eventNameTxt, tip1, [tip1.width + 10, 3]);
        view.addChild(eventNameTxt);

        view.setLayoutPosition(LayoutConst.lefttop, tip2, eventNameTxt, [eventNameTxt.textWidth + 10, -3]);
        view.addChild(tip2);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, rankTxt, tip2);
        view.addChild(rankTxt);
        if(PlatformManager.checkIsTextHorizontal())
        {
            rankTxt.x = tip2.x + tip2.width;
        }
        //{"exp":"5_1_1500","eventst":1534219200,"servantData":{"1001":"14_1_1500"},"eventId":"2"}   
        let param1Txt = ComponentManager.getTextField(LanguageManager.getlocal(`councilRankListParam5`, [data.exp.split('_')[2]]), 20);
        view.setLayoutPosition(LayoutConst.lefttop, param1Txt, bottomBg, [100,tip1.y + tip1.height + 30 - bottomBg.y]);
        if(PlatformManager.checkIsEnLang())
        {
            param1Txt.setPosition(bottomBg.x + bottomBg.width / 2 - param1Txt.width / 2,tip1.y + tip1.height + 30);
        }
        view.addChild(param1Txt);

        let count = 1;
        for(let i in data.servantData){
            let unit = data.servantData[i];
            let servantInfo = Config.ServantCfg.getServantItemById(i);
            let paramTxt = ComponentManager.getTextField(LanguageManager.getlocal(`councilRankListParam6`, [servantInfo.name, unit.split('_')[2]]), 20);
            if(PlatformManager.checkIsThSp())
            {
                view.setLayoutPosition(count % 2 ? LayoutConst.righttop : LayoutConst.lefttop, paramTxt, bottomBg, [50,tip1.y - bottomBg.y + tip1.height + 30 + 25 * (Math.floor(count / 2))]);
            }
            else if(PlatformManager.checkIsEnLang()||PlatformManager.checkIsRuLang())
            {
                paramTxt.setPosition(bottomBg.x + bottomBg.width / 2 - paramTxt.width / 2,tip1.y + tip1.height + 30 + 25 * (Math.floor(count)));
            }
            else
            {
                view.setLayoutPosition(count % 2 ? LayoutConst.righttop : LayoutConst.lefttop, paramTxt, bottomBg, [100,tip1.y - bottomBg.y + tip1.height + 30 + 25 * (Math.floor(count / 2))]);

            }
            view.addChild(paramTxt);
             ++ count;
        }

        view.addTouchTap(view.hide,view,null);
        // egret.Tween.get(view).wait(2000).to({alpha : 0}, 2000).call(()=>{
		// 	view.hide();
		// },view);
    }

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			'public_9_wordbg2'
		]);
    }

    public hide()
	{
		super.hide();
		let view = this;
        if(view.param.data.confirmcallback){
            view.param.data.confirmcallback.apply(view.param.data.callobj);
        }
		
    }
    
	public dispose():void
	{
		super.dispose();
	}
}