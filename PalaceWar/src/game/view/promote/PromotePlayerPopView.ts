/*
author : qianjun
desc : 分封弹窗
*/
class PromotePlayerPopView extends CommonView{
    public constructor(){
        super();
    }
    public promoteType = 1;

    private get api(){
        return Api.promoteVoApi;
    }

    private get cfg(){
        return Config.PromoteCfg;
    }

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "promotetopbg","servant_bottombg","emprankinglist_line","atkraceVisitbg","atkracevipbg"
        ]);
    } 

    public initView(){
        let view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PROMOTE_APPOINT), view.appointCallBack, view);
        let type = this.param.data.type;
        view.promoteType = type;
        //top背景图
        let _topBg:BaseBitmap = BaseBitmap.create('promotetopbg');
        _topBg.name = "_topBg";
        view.setLayoutPosition(LayoutConst.horizontalCentertop, _topBg, view, [0,view.titleBg.height]);
        view.addChild(_topBg);

        let DesctText = ComponentManager.getTextField(LanguageManager.getlocal('PromotePlayersPopViewText', [LanguageManager.getlocal(`promoteType${type}`),LanguageManager.getlocal(`promoteType${type}eff`)]), 22);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, DesctText, _topBg, [0,50]);
        DesctText.lineSpacing = 5;
        DesctText.textAlign = egret.HorizontalAlign.CENTER;
        view.addChild(DesctText);
        //targroup
        view.setLayoutPosition(LayoutConst.horizontalCentertop, view.tabbarGroup, _topBg, [0,_topBg.height + 4]);
        let tarGroupBg:BaseBitmap = BaseBitmap.create('servant_bottombg');
        tarGroupBg.width = view.width;
        tarGroupBg.height = GameConfig.stageHeigth - view.tabbarGroup.y + 15;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, tarGroupBg, _topBg, [0,_topBg.height]);
        view.addChild(tarGroupBg);

        view.swapChildren(view.tabbarGroup, tarGroupBg);
        
        view.container.width = tarGroupBg.width;
        view.container.height = tarGroupBg.height;
        view.setLayoutPosition(LayoutConst.lefttop, view.container, view.tabbarGroup, [0,view.tabbarGroup.height]);
    }
    
    protected getTabbarTextArr():Array<string>
	{
		return [
            `PromotePlayersPopViewTar1`, 
            `PromotePlayersPopViewTar2`, 
            `PromotePlayersPopViewTar3`, 
            `PromotePlayersPopViewTar4`, 
		];
    }
    
    private appointCallBack(evt : egret.Event):void{
        if (!evt || !evt.data){
            return ;
        }
        let view = this;
        let data = evt.data.data;
        if (data.ret < 0){
            if(data.ret == -3){
                App.CommonUtil.showTip(LanguageManager.getlocal('PromotePlayersPopViewAppointFail', [LanguageManager.getlocal(`officialTitle${view.cfg.needLv}`)]));
            }
            return;
        }
        App.CommonUtil.showTip(LanguageManager.getlocal('PromotePlayersPopViewAppointSuccess'));
        view.api.initListData(data.data);
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_PROMOTE_SUCCESS);
        view.hide();
    }

    public dispose():void
	{  
        let view = this;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PROMOTE_APPOINT), view.appointCallBack, view);
        super.dispose();
    }
}