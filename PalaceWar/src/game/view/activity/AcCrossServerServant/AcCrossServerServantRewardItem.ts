/**
 * author:qianjun
 * desc:门客擂台奖励item
*/
class AcCrossServerServantRewardItem extends ScrollListItem
{
	public constructor() {
		super();
    }
    
    private _data : any = null;

    private get api() : AcCrossServerServantVoApi{
        return Api.crossServerServantVoApi;
    }

	protected initItem(index:number,data:any)
    {	
        let type = data.type;
        let view = this;
        //App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        view._data = data;
        view.width = 512;

        let bg = BaseBitmap.create(`public_9_bg14`);
        bg.width = view.width;
        if(data.type == 'prank'){
            view.height = (index == 0 ? 250 : 140) + 10;
            bg.height = view.height - 10;
            
        }
        else{
            view.height = 160 + 10;
            bg.height = view.height - 10;
        }

        view.setLayoutPosition(LayoutConst.horizontalCentertop, bg, view);
        view.addChild(bg);

        let rankbg = BaseBitmap.create(data.type == 'prank' ? `crossservantrankbg` : (index == 0 ? 'crossservantwinbg' : 'crossservantlosebg'));
        rankbg.width = 140;
        if(PlatformManager.checkIsEnLang() && data.type != 'prank')
        {
            rankbg.setRes("crossservantrankbg");
            rankbg.width = 240;
        }
        view.setLayoutPosition(LayoutConst.horizontalCentertop, rankbg, bg, [0,10]);
        view.addChild(rankbg);

        let rankTxt = ComponentManager.getTextField('',20);
        if(data.type == 'prank'){
            if (Number(index) < 3){
                rankTxt.text = LanguageManager.getlocal("acRank_rank"+ (index+1));
            }else{
                rankTxt.text = LanguageManager.getlocal("acRank_rank4",[String(data.rewards.minRank),String(data.rewards.maxRank) ] );
            }
        }
        else{
            rankTxt.text = LanguageManager.getlocal("crossservantWinserver" + (index+1));
        }
        
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, rankTxt, rankbg);
        view.addChild(rankTxt);
                    
        let rIcons = data.type == 'prank' ? data.rewards.rewardIcons : GameData.getRewardItemIcons((index == 0 ? view.api.cfg.winServer : view.api.cfg.loseServer),true,true);
        let scroStartY = rankbg.y + rankbg.height * 0.7 + 20;
        //奖励物品
        let tmpX = (view.width - rIcons.length * rIcons[0].width * 0.7 - 4 * 8) / 2;
        let maxY = 0;
        for (let index = 0; index < rIcons.length; index++) {
            var element = rIcons[index];
            element.scaleX = element.scaleY = 0.7;
            element.x = tmpX;
            element.y = scroStartY;
            tmpX +=  (element.width * element.scaleX + 8);
            //换行处理
            if (tmpX >= view.width)
            {
                tmpX = (view.width - 5 * rIcons[0].width * 0.7 - 4 * 8) / 2;;
                scroStartY += element.height * 0.7 + 15;
                element.x = tmpX;
                element.y = scroStartY;
                tmpX += (element.width * 0.7 +8);
            }
            maxY = element.y;
            view.addChild(element);
        }
        if(data.type == 'prank' && index == 0){
            

            let line = BaseBitmap.create(`public_line3`);
            line.width = 430;
            view.setLayoutPosition(LayoutConst.horizontalCentertop, line, bg, [0,maxY + rIcons[0].height * 0.7 + 15]);
            view.addChild(line);

            let titleTxt = ComponentManager.getTextField(LanguageManager.getlocal('crossservantReawrdSkinTitle', [Config.ServantCfg.getServantItemById(view.api.getVsServant(1)).name, Config.ServantCfg.getServantItemById(view.api.getVsServant(2)).name]), 20, TextFieldConst.COLOR_BLACK);
            view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, titleTxt, line);
            view.addChild(titleTxt);
            
            let descbg = BaseBitmap.create(`crossservantawardbbg`);
            descbg.height = 69;
            descbg.width = 470;
            view.setLayoutPosition(LayoutConst.horizontalCentertop, descbg, titleTxt, [0,titleTxt.textHeight+5]);
            view.addChild(descbg);

            let cfg1 = Config.ServantskinCfg.getServantSkinItemById(view.api.getVsServantSkin(1));
            let cfg2 = Config.ServantskinCfg.getServantSkinItemById(view.api.getVsServantSkin(2));

            let servantVo1 : ServantInfoVo = Api.servantVoApi.getServantObj(cfg1.servantId);
            let servantVo2 : ServantInfoVo = Api.servantVoApi.getServantObj(cfg2.servantId);
            let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal('crossServerServantTip2', [cfg1.getSkinName(), cfg2.getSkinName(),servantVo1.servantName,servantVo2.servantName]), 20);
            tipTxt.lineSpacing = 5;
            tipTxt.textAlign = egret.HorizontalAlign.CENTER;
            view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, tipTxt, descbg);
            view.addChild(tipTxt);
        }
    }

	public dispose():void
    {
        let view = this;
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_ATKRACEGRANK), view.getMsgBack, view);
        super.dispose();
    }
}