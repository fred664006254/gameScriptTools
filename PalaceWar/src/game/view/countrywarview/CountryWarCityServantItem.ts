/**
 *  门客布阵item
 * author qianjun
 */
class CountryWarCityServantItem extends ScrollListItem {
    public constructor() {
        super();
    }

    private _empty_g: BaseDisplayObjectContainer = null;
    private _info_g: BaseDisplayObjectContainer = null;
    private _cardbg: BaseLoadBitmap = null;
    private _servantImg: BaseLoadBitmap = null;
    private _nameText: BaseTextField = null;
    private _levelText: BaseTextField = null;
    private _sxingtext: BaseTextField = null;
    private _data: any;
    private _curServantId: any;
    private _itemIndex: number = 0;
    private _planIcon : BaseLoadBitmap = null;
    private _planAdd : BaseBitmap = null;
    private _planText : BaseTextField = null;
    private _planBg : BaseBitmap = null;
    private _reddot : BaseBitmap = null;

    protected initItem(index: number, data: any) {
        let view = this;
        view.cacheAsBitmap = true;
        view._data = data;
        view._itemIndex = index;
        view.width = 520;
        view.height = 130 + view.getSpaceY();
        let bg = BaseBitmap.create(`public_9_bg14`);
        bg.width = 520;
        bg.height = view.height - view.getSpaceY();
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, view);
        view.addChild(bg);
        //门客信息
        view._curServantId = data.servantID;
        let servantInfoObj: ServantInfoVo = data.empty ? null : Api.servantVoApi.getServantObj(data.servantID);
        let servantQuality = '';
        let servantPic = '';
        let addIcon = BaseBitmap.create("childview_addicon");
        // addIcon.addTouchTap(view.servantTouch, this);
        addIcon.setScale(0.75);

        if (data.empty) {
            servantQuality = `servant_cardbg_0`;
            // servantPic = `childview_addicon`;
        }
        else {
            servantQuality = servantInfoObj.qualityBoxImgPath;
            servantPic = servantInfoObj.halfImgPath;
        }

        let cardbg = BaseLoadBitmap.create(servantQuality);
        cardbg.width = 106;
        cardbg.height = 106;
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, cardbg, bg, [10, 0]);
        view.addChild(cardbg);
        view._cardbg = cardbg;

        view._servantImg = BaseLoadBitmap.create(servantPic);
        view._servantImg.width = 106;
        view._servantImg.height = 106;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._servantImg, cardbg);
        view.addChild(view._servantImg);


        view._empty_g = new BaseDisplayObjectContainer();
        view._empty_g.width = view.width;
        view._empty_g.height = view.height;
        view.addChild(view._empty_g);

        cardbg.addTouchTap(() => {
            if(!view._empty_g.visible){
                return;
            }
            if(view.api.getCurpeirod() > 1){
                App.CommonUtil.showTip(LanguageManager.getlocal("CountryWarCityTip4"));
                return;
            }
            if(Api.playerVoApi.getPlayerLevel() < Config.CountrywarCfg.unlock){
                App.CommonUtil.showTip(LanguageManager.getlocal("CountryWarCityTip6"));
                return;
            }
            if(Api.countryWarVoApi.isCityHaveServant(Api.countryWarVoApi.getServerCityId(data.cityId)))
            {
                App.CommonUtil.showTip(LanguageManager.getlocal("countryWarCityHaveServant"));
                return;
            }
            let servantInfoVoList = Api.servantVoApi.getServantInfoListWithSort(1);
            let servantInfoList: { servantId: string, servantName: string, level: number, fightValue: number, qualityBoxImgPath: string, halfImgPath: string,banishSt:number }[] = [];
            for (let key in servantInfoVoList) {
                let item = servantInfoVoList[key];
                let fightValue = item.total;
                let servantInfo = { servantId: item.servantId, servantName: item.servantName, level: item.level, fightValue: fightValue, qualityBoxImgPath: item.qualityBoxImgPath, halfImgPath: item.halfImgPath,banishSt:item.banishSt };
                servantInfoList.push(servantInfo);
            }
            servantInfoList.sort((a, b) => {
                return b.fightValue - a.fightValue;
            })
            ViewController.getInstance().openView(ViewConst.POPUP.COUNTRYWARSELECTSERVANTPOPUPVIEW, { servantList: servantInfoList ,cityId:data.cityId,index:index});
        }, this);

        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, addIcon, cardbg);
        view._empty_g.addChild(addIcon);

        view._info_g = new BaseDisplayObjectContainer();
        view._info_g.width = view.width;
        view._info_g.height = view.height;
        view.addChild(view._info_g);

        let addText = ComponentManager.getTextField(LanguageManager.getlocal(`CountryWarCityAddTip`), 20, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, addText, cardbg, [cardbg.width + 10, 0]);
        view._empty_g.addChild(addText);

        let reddot:BaseBitmap = BaseBitmap.create('public_dot2');
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, reddot, cardbg);
        view._empty_g.addChild(reddot);
        let flag = false;
        if(view.api.isPlayerSendServant(data.cityId)){
            flag = !view.api.isCityHaveServant(view.api.getCityIndex(data.cityId));
        }
        reddot.visible = flag;
        view._reddot = reddot;

        let nameTxt = ComponentManager.getTextField('', 20, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, nameTxt, cardbg, [cardbg.width + 10, 10]);
        view._info_g.addChild(nameTxt);
        view._nameText = nameTxt;

        let mainsxText = ComponentManager.getTextField('', 20, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, mainsxText, nameTxt, [0, 20 + 10]);
        view._levelText = mainsxText;
        view._info_g.addChild(mainsxText);

        let zzhitext = ComponentManager.getTextField(``, 20, TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, zzhitext, mainsxText, [0, 20 + 10]);
        view._info_g.addChild(zzhitext);
        view._sxingtext = zzhitext;

        let tipbg = BaseBitmap.create('coutrywarcitytag');
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, tipbg, bg, [5, 4]);
        view._info_g.addChild(tipbg);

        let tiptxt = ComponentManager.getTextField(LanguageManager.getlocal(`CountryWarCitySend`, [LanguageManager.getlocal(`CountryWarCityName${data.cityId}`)]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, tiptxt, tipbg, [15, 0]);
        view._info_g.addChild(tiptxt);

        let cancelbtn = ComponentManager.getButton(`countrywarcancel`, '', view.clearServant, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, cancelbtn, tipbg, [50, tipbg.height]);
        view._info_g.addChild(cancelbtn);

        let cancelnameBg = BaseBitmap.create(`countrywarbtndescbg`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, cancelnameBg, cancelbtn, [0, -cancelnameBg.height + 15], true);
        cancelbtn.addChild(cancelnameBg);

        let cancelNameTxt = ComponentManager.getTextField(LanguageManager.getlocal('allianceWarUseServantBtn2'), 16);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, cancelNameTxt, cancelnameBg);
        cancelbtn.addChild(cancelNameTxt);

        cancelbtn.visible = data.stra == 0;

        let planbtn = ComponentManager.getButton(`countrywarcitybtn`, '', this.planBtnClick, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, planbtn, cancelbtn, [cancelbtn.width + 15, 0]);
        view._info_g.addChild(planbtn);

        let planaddIcon = BaseBitmap.create("childview_addicon");
        planaddIcon.setScale(0.5);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, planaddIcon, planbtn, [0, 0], true);
        planbtn.addChild(planaddIcon);
        view._planAdd = planaddIcon;
        
        let planIcon = BaseLoadBitmap.create(``);
        planIcon.width = planIcon.height = 100;
        planIcon.setScale(0.7);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, planIcon, planbtn, [0, 0], true);
        planbtn.addChild(planIcon);
        view._planIcon = planIcon;

        let plannameBg = BaseBitmap.create(`countrywarbtndescbg`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, plannameBg, planbtn, [0, -plannameBg.height + 15], true);
        planbtn.addChild(plannameBg);
        view._planBg = plannameBg;
        
        let planNameTxt = ComponentManager.getTextField('', 16);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, planNameTxt, cancelnameBg);
        planbtn.addChild(planNameTxt);
        view._planText = planNameTxt;

        view.freshPlanText();


        if (!data.empty) {
            view._empty_g.visible = false;
            view._info_g.visible = true;
            view.fresh_servant({ id: data.servantID });
        }
        else {
            view._empty_g.visible = true;
            view._info_g.visible = false;
        }
        view._servantImg.visible = !view._empty_g.visible;
    }

    private freshPlanText():void{
        let view = this;
        let data = view._data;
        let str = '';
        if(data.stra){
            let plan = Config.CountrywarCfg.secretList[data.stra];
            let cfg = Config.ItemCfg.getItemCfgById(plan.item);
            str = cfg.name;
            view._planIcon.setload(cfg.icon);
        }
        else{
            str = LanguageManager.getlocal(`CountryWarCityPlanSelect`);
        }
        view._planText.text = str;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._planText, view._planBg);
        view._planAdd.visible = data.stra == 0;
        view._planIcon.visible = !view._planAdd.visible;
    }
    /**
     * 计策相关
     */
    private planBtnClick() {
        if(this.api.getCurpeirod() > 1){
            App.CommonUtil.showTip(LanguageManager.getlocal("CountryWarCityTip4"));
            return;
        }
        if(this._data.stra == 0){
            ViewController.getInstance().openView(ViewConst.POPUP.COUNTRYWARPLANPOPUPVIEW,{cityId:this._data.cityId});
        }
    }

    private get api() {
        return Api.countryWarVoApi;
    }

    public fresh_servant(params: { id: string }): void {
        let view = this;
        view._servantImg.visible = true;
        let data = view._data;
        let servantId: string | number = params.id;
        view._curServantId = servantId;
        let servantInfoObj: ServantInfoVo = Api.servantVoApi.getServantObj(servantId);
        //品质 头像 名称
        view._cardbg.setload(`${servantInfoObj.qualityBoxImgPath}`);
        view._servantImg.setload(`${servantInfoObj.halfImgPath}`);
        view._info_g.visible = true;
        view._empty_g.visible = false
        view._nameText.text = servantInfoObj.servantName;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._servantImg, view._cardbg);

        view._levelText.text = LanguageManager.getlocal('CountryWarCityLevel', [servantInfoObj.level.toString()]);
        let totalV = String(servantInfoObj.getTotalBookValue(data.type));
        
        view._sxingtext.text = LanguageManager.getlocal(`CountryWarCityBasePower`, [App.StringUtil.changeIntToText(this._data.servantTotalattr)]);
    }

    /**
     * 门客下阵
     */
    private clearServant(): void {
        if(Api.switchVoApi.checkOpenServerMaintain()){
            App.CommonUtil.showTip(LanguageManager.getlocal("mergeServerTip"));
            return;
        }
        if(this.api.getCurpeirod() > 1){
            App.CommonUtil.showTip(LanguageManager.getlocal("CountryWarCityTip4"));
            return;
        }
        let servantInfoObj: ServantInfoVo =  Api.servantVoApi.getServantObj(this._data.servantID);
        let titleKey = "CountryWarServentWithdrawTitle";
        let desc1 = LanguageManager.getlocal("countryWarCancelServantDesc1",[servantInfoObj.servantName,LanguageManager.getlocal("CountryWarCityName"+ this._data.cityId),String(Config.CountrywarCfg.servantBack)])
        ViewController.getInstance().openView(ViewConst.POPUP.COUNTRYWARCONFIRMPOPUPVIEW,{type:2,desc1:desc1,titleKey:titleKey,callbackHandle:this.callbackHandle,handle:this})
        
    }
    /**
     * 回调
     */
    private callbackHandle()
    {
        if(Api.switchVoApi.checkOpenServerMaintain()){
            App.CommonUtil.showTip(LanguageManager.getlocal("mergeServerTip"));
            return;
        } 
        NetManager.request(NetRequestConst.REQUEST_COUNTRYWAY_CANCELSERVANT,{sid:this._data.servantID,city:Api.countryWarVoApi.getServerCityId(this._data.cityId)});
    }
    public get curServantId(): any {
        return this._curServantId;
    }

    private servantTouch(): void {
        let view = this;
        let data = view._data;
        let allServantInfo = {};
        let allKey: string[] = Api.servantVoApi.getServantInfoIdListByProperty(0);
        let showTab: any[] = [];
        for (let k in allKey) {
            let key: string = allKey[k];
            let mainAtr = 0;
            let attr = '';
            let servantInfoObj = Api.servantVoApi.getServantObj(key);
            switch (data.type) {
                case 1:
                    mainAtr = servantInfoObj.attrVo.forceTotal;//App.StringUtil.changeIntToText(servantInfoObj.attrVo.forceTotal);
                    attr = `playerview_forceAtt`;
                    break;
                case 2:
                    mainAtr = servantInfoObj.attrVo.brainsTotal;//App.StringUtil.changeIntToText(servantInfoObj.attrVo.brainsTotal);
                    attr = `playerview_inteAtt`;
                    break;
                case 4:
                    mainAtr = servantInfoObj.attrVo.charmTotal;//App.StringUtil.changeIntToText(servantInfoObj.attrVo.charmTotal);
                    attr = `playerview_charmAtt`;
                    break;
                case 3:
                    mainAtr = servantInfoObj.attrVo.politicsTotal;//App.StringUtil.changeIntToText(servantInfoObj.attrVo.politicsTotal);
                    attr = `playerview_policyAtt`;
                    break;
            }
            showTab.push({
                'servantId': key,
                'text': LanguageManager.getlocal(attr) + App.StringUtil.changeIntToText(mainAtr),
                'inBuzhen': false,
                'value': mainAtr
            });
        }
        showTab.sort((a, b) => {
            if (a.inBuzhen && b.inBuzhen) {
                return b.value - a.value;
            }
            else if (a.inBuzhen) {
                return 1;
            }
            else if (b.inBuzhen) {
                return -1;
            }
            else {
                return b.value - a.value;
            }
        });
        ViewController.getInstance().openView(ViewConst.POPUP.SERVANTSELECTEDPOPUPVIEW, {
            type: ServantSelectedPopupView.TYPE_EMPWAR,
            info: showTab,
            callback: view.fresh_servant,
            handler: view
        });
    }

    private checkBuzhen(event: egret.Event): void {
        let data = event.data;
        let view = this;
        if (!data) {
            return;
        }
        if (view._itemIndex == data.itemIndex) {
            return;
        }
        if (view._curServantId == data.servantId) {
            view.clearServant();
        }
    }

	/**
	 * 不同格子Y间距
	 */
    public getSpaceY(): number {
        return 0;
    }

    public dispose(): void {
        let view = this;
        //App.MessageHelper.removeEventListener(MessageConst.MESSAGE_EMPWEAR_BUZHEN_CHANGE,this.checkBuzhen,this);
        view.cacheAsBitmap = false;
        view._servantImg.removeTouchTap();
        view._cardbg.removeTouchTap();
        view._empty_g.dispose();
        view._info_g.dispose();
        view._empty_g = null;
        view._info_g = null;
        BaseLoadBitmap.release(view._cardbg);
        view._cardbg = null;
        BaseLoadBitmap.release(view._servantImg);
        view._servantImg = null;
        view._nameText = null;
        view._sxingtext = null;
        view._data = null;
        super.dispose();
    }
}
