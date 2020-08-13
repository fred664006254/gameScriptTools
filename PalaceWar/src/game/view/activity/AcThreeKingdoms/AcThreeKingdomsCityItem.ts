
class AcThreeKingdomsCityItem extends ScrollListItem
{
    private _code : string = '';
    private _data : any = null;
    private _citySingle : BaseDisplayObjectContainer = null;
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
    

	protected initItem(index:number,data:any,param:any){
        let view = this;
        view._code = param;
        view._data = data;
        view.width = 260;
        view.height = 107;

		let code = view.getUiCode();
        let i = data.id;
        let citySingle = new BaseDisplayObjectContainer();
        citySingle.name = `citySingle${i}`;
        view.addChild(citySingle);
        citySingle.width = 150;
        citySingle.height = 102;
        view._citySingle = citySingle;
        view.addChild(citySingle);

        let bg = BaseBitmap.create(`threekingdomscityzhanjulistbg`);
        citySingle.addChild(bg);
        bg.name = `bg`;

        let playerGroup = new BaseDisplayObjectContainer();
        playerGroup.width = 230;
        playerGroup.height = 70;
        playerGroup.name = `playerGroup`
        citySingle.addChild(playerGroup);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, playerGroup, bg);

        let emptyTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip51`, view.getUiCode()), [view.cfg.powerNeed.toString()]), 20,TextFieldConst.COLOR_BROWN);
        emptyTxt.name = `emptyTxt`;
        emptyTxt.lineSpacing = 10;
        emptyTxt.textAlign = egret.HorizontalAlign.CENTER;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, emptyTxt, bg);
        citySingle.addChild(emptyTxt);

        let flag = BaseBitmap.create(`threekingdomscityzhanjuflag`);
        citySingle.addChild(flag);
        flag.name = `flag`;

        // citySingle.setPosition(i % 2 == 1 ? 10 : 270, 10 + (Math.ceil(i / 2) - 1) * 110);

        citySingle.addTouchTap(()=>{
                //打开出站弹窗
                if(view.vo.isInWarTime()){
                    ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSPREPAREVIEW,{
                        aid : view.aid,
                        code : view.code,
                        cityId : data.cityid,
                        kingdomid : data.kingdomid,
                        judianid : i
                    });
                }
                else{
                    App.CommonUtil.showTip(LanguageManager.getlocal(`acThreeKingdomsTip60-1`));
                    // view.hide();
                }
        }, view, null);

        let order = BaseBitmap.create(`threekingdomscityzhanjuorder`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, order, bg);
        citySingle.addChild(order);
        
        let ordrTxt = ComponentManager.getTextField(`${i}`, 16);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, ordrTxt, order, [0,-4]);
        citySingle.addChild(ordrTxt);

        view.freshCity();
    }
    
    public freshCity():void{
        let view = this;
        let code = view.getUiCode();
        let citySingle = view._citySingle;
        let playerGroup =<BaseDisplayObjectContainer>citySingle.getChildByName(`playerGroup`);
        let bg = <BaseBitmap>citySingle.getChildByName(`bg`);
        let emptyTxt = <BaseTextField>citySingle.getChildByName(`emptyTxt`);
        let flag = <BaseBitmap>citySingle.getChildByName(`flag`);
        flag.visible = false;
        emptyTxt.visible = false;
        if(playerGroup){
            playerGroup.removeChildren();
        }
        let data = view.vo.getJudianPlayerInfo(view._data.kingdomid, view._data.cityid, view._data.id);
        if(data){
            bg.setRes(`threekingdomscityzhanjulistbg${data.kingdomid}`);
            //头像框
            let headContainer = Api.playerVoApi.getPlayerCircleHead(Number(data.pic),(data.ptitleid));
            flag.visible = Number(data.uid) == Api.playerVoApi.getPlayerID();
            headContainer.addTouchTap(()=>{
                NetManager.request(NetRequestConst.REQUEST_RANKG_USERSHOT,{
                    ruid:data.uid,
                    rzid:Api.mergeServerVoApi.getTrueZid(data.uid)
                });
            },this);    
            headContainer.setScale(0.8);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, headContainer, playerGroup, [0,-5], true);
            
            let namebg = BaseBitmap.create(`threekingdomscityzhanjunamebg${data.kingdomid}`);
            playerGroup.addChild(namebg);
            namebg.setPosition(26,0);
            //玩家名`<font size=18>${Number(data.uid) == Api.playerVoApi.getPlayerID() ? (`(${(data.army / data.max * 100).toFixed(0)}%)`) : ``}</font>`
            let playernameTxt = ComponentManager.getTextField(data.name, 22, TextFieldConst.COLOR_LIGHT_YELLOW);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, playernameTxt, namebg);
            playerGroup.addChild(playernameTxt);
            //阵营
            let kingdomTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip52`, code), [LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTeam${data.kingdomid}`, code))]), 18, TextFieldConst.COLOR_BROWN);
            playerGroup.addChild(kingdomTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, kingdomTxt, namebg, [60,30]);
            //兵力
            let numTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip29`, code), [App.StringUtil.changeIntToText3(data.army)]), 18, TextFieldConst.COLOR_BROWN);
            playerGroup.addChild(numTxt);

            playerGroup.addChild(headContainer);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, numTxt, kingdomTxt, [0,kingdomTxt.textHeight+5]);
        }
        else{
            bg.setRes(`threekingdomscityzhanjulistbg`);
            emptyTxt.visible = true;
        }
    }



	public dispose():void
    {
        let view = this;
        view._citySingle = null;
        view._data = null;
        super.dispose();
    }
}