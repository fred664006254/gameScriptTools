/**
 *  门客布阵item
 * author qianjun
 */
class EmperorWarBuzhenItem  extends ScrollListItem
{
    public constructor()
    {
        super();
    }

    private _empty_g : BaseDisplayObjectContainer = null;
    private _info_g : BaseDisplayObjectContainer = null;
    private _cardbg : BaseLoadBitmap = null;
    private _servantImg : BaseLoadBitmap = null;
    private _addText : BaseTextField = null;
    private _delBtn : BaseButton = null; 
    private _nameText : BaseTextField = null;
    private _mainatrText : BaseTextField = null;
    private _zzhitext : BaseTextField = null;
    private _sxingtext : BaseTextField = null;
    private _data : any;
    private _curServantId : any;
    private _mainAtr : string = '';
    private _alvImg : BaseLoadBitmap = null;
    private _itemIndex : number = 0;
    private _addIcon : BaseBitmap = null;

    protected initItem(index:number,data:any)
    {
        let view = this;
        view.cacheAsBitmap=true;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_EMPWEAR_BUZHEN_CHANGE,this.checkBuzhen,this);
        view._data = data;
        view._itemIndex = index;
        view.width = 622;
        view.height = 159;
        let bg = BaseBitmap.create(`empmanbg`);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, bg, view);
        view.addChild(bg);
        //属性
        let sxing = BaseBitmap.create(`emp${data.image}`);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, sxing, bg, [7,-2]);
        view.addChild(sxing);
        //门客信息
        view._curServantId = data.servantID;
        let servantInfoObj : ServantInfoVo = data.empty ? null : Api.servantVoApi.getServantObj(data.servantID);
        let servantQuality = '';
        let servantPic = '';
        let addIcon = BaseBitmap.create("childview_addicon");
        view._addIcon = addIcon;

        if(data.empty){
            servantQuality = `servant_cardbg_0`;
            // servantPic = `childview_addicon`;
            addIcon.visible = true;
        }
        else{
            servantQuality = servantInfoObj.qualityBoxImgPath;
            servantPic = servantInfoObj.halfImgPath;
            addIcon.visible = false;
        }

        let cardbg = BaseLoadBitmap.create(servantQuality);
        cardbg.width = 194; 
        cardbg.height = 192; 
        cardbg.setScale(0.67);
        cardbg.addTouchTap(view.servantTouch,view);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, cardbg, view, [sxing.x + sxing.width + 30,0]);
        view.addChild(cardbg);
        view._cardbg = cardbg;
        
        view._servantImg = BaseLoadBitmap.create(servantPic);
        view._servantImg.width = 180;
        view._servantImg.height = 177;
        view._servantImg.setScale(0.67);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._servantImg, cardbg);
        view._servantImg.addTouchTap(view.servantTouch,view);
        view.addChild(view._servantImg);
        view._servantImg.visible = !addIcon.visible;

        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, addIcon, cardbg);
        view.addChild(addIcon);

        view._empty_g = new BaseDisplayObjectContainer();
        view._empty_g.width = view.width;
        view._empty_g.height = view.height;
        view.addChild(view._empty_g);

        view._info_g = new BaseDisplayObjectContainer();
        view._info_g.width = view.width;
        view._info_g.height = view.height;
        view.addChild(view._info_g);

        let addText = ComponentManager.getTextField(LanguageManager.getlocal(`emperorWarBuzhenAdd`),22,TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, addText, view);
        addText.visible = false;
        view._empty_g.addChild(addText);
        view._addText = addText;

        let nameTxt = ComponentManager.getTextField('', 22, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.lefttop, nameTxt, cardbg, [cardbg.width * 0.67 + 20,10]);
        view._info_g.addChild(nameTxt);
        view._nameText = nameTxt;

        let sxbg = BaseBitmap.create(`public_9_managebg`);
        sxbg.height = 80;
        sxbg.width = 230;
        if(PlatformManager.checkIsThSp())
        {
             sxbg.width = 300;
        }
        view.setLayoutPosition(LayoutConst.lefttop, sxbg, nameTxt, [-3,22 + 5]);
        view._info_g.addChild(sxbg);

        let mainsxText = ComponentManager.getTextField('', 20, 0x3e9b00);
        view.setLayoutPosition(LayoutConst.lefttop, mainsxText, sxbg, [10,5]);
        view._mainatrText = mainsxText;
        view._info_g.addChild(mainsxText);

        let zzhitext = ComponentManager.getTextField(``, 20, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.lefttop, zzhitext, mainsxText, [0,20+5]);
        view._info_g.addChild(zzhitext);
        view._zzhitext = zzhitext;

        let sxingtext = ComponentManager.getTextField(``, 20, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.lefttop, sxingtext, zzhitext, [0,20+5]);
        view._info_g.addChild(sxingtext);
        view._sxingtext = sxingtext;
        
        //爵位
        let alvImg = BaseLoadBitmap.create(``);
        alvImg.width = 91;
        alvImg.height = 81;
        view.setLayoutPosition(LayoutConst.rightverticalCenter, alvImg, view, [20,0]);
        view._info_g.addChild(alvImg);
        view._alvImg = alvImg;
        

        let delbtn = ComponentManager.getButton("button_del1",``,view.clearServant,view);
        view.setLayoutPosition(LayoutConst.righttop, delbtn, cardbg, [-20,-10]);
        view._info_g.addChild(delbtn);
        view._delBtn = delbtn;

        if(!data.empty){
            view._empty_g.visible = false;
            view._info_g.visible = true;
            view.fresh_servant({id:data.servantID});
        }
        else{
            view._empty_g.visible = true;
            view._info_g.visible = false;
        }
    }

    private get api(){
        return Api.emperorwarVoApi;
    }

    private fresh_servant(params:{id:string}):void{
        let view = this;
        view._addIcon.visible = false;
        view._servantImg.visible = true;
        let data = view._data;
        let servantId:string|number=params.id;
        view._curServantId = servantId;
        let servantInfoObj : ServantInfoVo = Api.servantVoApi.getServantObj(servantId);
        //品质 头像 名称
        view._cardbg.setload(`${servantInfoObj.qualityBoxImgPath}`);
        view._servantImg.setload(`${servantInfoObj.halfImgPath}`);
        view._info_g.visible = true;
        view._empty_g.visible = false
        view._nameText.text = servantInfoObj.servantName;
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._servantImg, view._cardbg);
        //主属性 1 武力 2 智力 3政治 4魅力
        let mainAtr = '';
        let attr = '';
        switch(data.type){
            case 1: 
                mainAtr = App.StringUtil.changeIntToText(servantInfoObj.attrVo.forceTotal);
                attr = `emperorWarBuzhen_forceAtt`;
                break;
            case 2:
                mainAtr = App.StringUtil.changeIntToText(servantInfoObj.attrVo.brainsTotal);
                attr = `emperorWarBuzhen_inteAtt`;
                break;
            case 4:
                mainAtr = App.StringUtil.changeIntToText(servantInfoObj.attrVo.charmTotal);
                attr = `emperorWarBuzhen_charmAtt`;
                break;
            case 3:
                mainAtr = App.StringUtil.changeIntToText(servantInfoObj.attrVo.politicsTotal);
                attr = `emperorWarBuzhen_policyAtt`;
                break;
        }
        view._mainatrText.text = LanguageManager.getlocal(attr, [mainAtr]);
        view._mainAtr = mainAtr;
        let totalV = String(servantInfoObj.getTotalBookValue(data.type));
        view._zzhitext.text = LanguageManager.getlocal(`emperorWarBuzhenZzhi`,[totalV]);
        view._sxingtext.text = LanguageManager.getlocal(`emperorWarBuzhenSx`,[mainAtr.toString()]);
        //爵位
        if (servantInfoObj.clv > 0){
            view._alvImg.setload(`servant_alv_${servantInfoObj.clv}`);
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_EMPWEAR_BUZHEN_CHANGE,{itemIndex : view._itemIndex,servantId :servantId});
    }

    //下阵
    private clearServant():void{
        let view = this;
        view._addIcon.visible = true;
        view._servantImg.visible = false;

        view._cardbg.setload(`servant_cardbg_0`);
        
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._servantImg, view._cardbg);
        view._info_g.visible = false;
        view._empty_g.visible = true;
        view._curServantId = null;
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_EMPWEAR_BUZHEN_CHANGE);
    }

    public get curServantId(): any {
        return this._curServantId;
    }

    private servantTouch():void{
        let view = this;
        let data = view._data;
        let allServantInfo = {};
        let allKey:string[] = Api.servantVoApi.getServantInfoIdListByProperty(data.type);
        let showTab:any[] = [];
        for (let k in allKey){
            let key:string = allKey[k];
            let mainAtr = 0;
            let attr = '';
            let servantInfoObj = Api.servantVoApi.getServantObj(key);
            let weaponAdd = 0;
            let weaponvo = Api.weaponVoApi.getWeaponInfoVoByServantId(key);
            if (weaponvo)
            {
                weaponAdd = weaponvo.getSpecialityByType(4);
            }

            switch(data.type){
                case 1: 
                    mainAtr = servantInfoObj.attrVo.forceTotal+weaponAdd;//App.StringUtil.changeIntToText(servantInfoObj.attrVo.forceTotal);
                    attr = `playerview_forceAtt`;   
                    break;
                case 2:
                    mainAtr = servantInfoObj.attrVo.brainsTotal+weaponAdd;//App.StringUtil.changeIntToText(servantInfoObj.attrVo.brainsTotal);
                    attr = `playerview_inteAtt`;
                    break;
                case 4:
                    mainAtr = servantInfoObj.attrVo.charmTotal+weaponAdd;//App.StringUtil.changeIntToText(servantInfoObj.attrVo.charmTotal);
                    attr = `playerview_charmAtt`;
                    break;
                case 3:
                    mainAtr = servantInfoObj.attrVo.politicsTotal+weaponAdd;//App.StringUtil.changeIntToText(servantInfoObj.attrVo.politicsTotal);
                    attr = `playerview_policyAtt`;
                    break;
            }
            showTab.push({
                'servantId':key,
                'text':LanguageManager.getlocal(attr) + App.StringUtil.changeIntToText(mainAtr),
                'inBuzhen':view.api.haveInBuzhen(key),
                'value':mainAtr
            });
        }
        showTab.sort((a,b)=>{
            if(a.inBuzhen && b.inBuzhen){
                return b.value - a.value;
            }
            else if(a.inBuzhen){
                return 1;
            }
            else if(b.inBuzhen){
                return -1;
            }
            else{
                return b.value - a.value;
            }
        });
        ViewController.getInstance().openView(ViewConst.POPUP.SERVANTSELECTEDPOPUPVIEW,
        {type:ServantSelectedPopupView.TYPE_EMPWAR,"info":showTab,callback:this.fresh_servant,handler:this});
    }

    private checkBuzhen(event:egret.Event):void{
        let data = event.data;
        let view = this;
        if(!data){
            return;
        }
        if(view._itemIndex == data.itemIndex){
            return;
        }
        if(view._curServantId == data.servantId){
            view.clearServant();
        }
    }

    public getSpaceX():number
	{
		return 10;
	}
	/**
	 * 不同格子Y间距
	 */
	public getSpaceY():number
	{
		return 5;
    }
    
    public dispose():void
    {
        let view = this;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_EMPWEAR_BUZHEN_CHANGE,this.checkBuzhen,this);
        view.cacheAsBitmap=false;
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
        view._addText = null;
        view._delBtn = null; 
        view._nameText = null;
        view._mainatrText = null;
        view._zzhitext = null;
        view._sxingtext = null;
        view._data = null;
        BaseLoadBitmap.release(view._alvImg);
        view._alvImg = null;
        view._addIcon = null;
        super.dispose();
    }
}
