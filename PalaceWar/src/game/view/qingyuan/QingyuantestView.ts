/**
 * 情缘详细弹窗
 * @class WifeSelectedPopupView
 */
class QingyuantestView extends PopupView{
    
	public constructor(){
		super();
	}

	protected getResourceList():string[]
	{
        let resArr:string[]=[
            `wifestatus_lock`,`qingyuanclick`,`qingyuanball`,`qingyuanclicked`, `qingyuanunlock`];
		return super.getResourceList().concat(resArr);
    }
    
    protected getBgName():string{
        let data : Config.EncounterCfg.EncounterInfoCfg = this.param.data;
        return `qingyuanpopbg${data.type}`;
    }

    protected getCloseBtnName():string{
        return `commonview_closebtn1`;
    }

    protected getTitleStr():string{
        return null;
    }
	/**
	 * 需要传的参数{callback：回调函数，handler:回调函数所属对下，type：面板类型（1，2，3），itemId：使用道具时传}
	 */
	protected initView():void{
        let view = this;
        let data : Config.EncounterCfg.EncounterInfoCfg = view.param.data;
		//已解锁数目
        let haveunlock = Api.encounterVoApi.getActiveBuffNum(data.type);
        //人物形象
        let rolegroup = new BaseDisplayObjectContainer();
        rolegroup.width = 600;
        rolegroup.height = 609;
        rolegroup.x = 20;
        rolegroup.y = 0;
        rolegroup.name = `roleGroup`;
        rolegroup.mask = new egret.Rectangle(0,0, rolegroup.width, rolegroup.height);
        view.addChildToContainer(rolegroup);
        let type = data.type;

        let poscfg = data.coordinateInside[`2132`];
        let group = new BaseDisplayObjectContainer();
        group.name = `group`;
        rolegroup.addChild(group);
        group.x = poscfg.x;
        group.y = poscfg.y;
        let role = BaseBitmap.create(`wonderLandrole2132`); 
        role.name = `role`;
        group.addChild(role);

        let inputTF2 = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL,535,30,"public_9_bg5");
        inputTF2.name = `inputTFR`;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, inputTF2, rolegroup, [0, 100]);
        view.addChildToContainer(inputTF2);

        let inputTFG = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL,535,30,"public_9_bg5");
        inputTFG.name = `inputTFG`;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, inputTFG, rolegroup, [0, 150]);
        view.addChildToContainer(inputTFG);

        let inputTFB = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL,535,30,"public_9_bg5");
        inputTFB.name = `inputTFB`;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, inputTFB, rolegroup, [0, 200]);
        view.addChildToContainer(inputTFB);

        let inputTFA = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_TITLE_SMALL,535,30,"public_9_bg5");
        inputTFA.name = `inputTFA`;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, inputTFA, rolegroup, [0, 250]);
        view.addChildToContainer(inputTFA);

        let btn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, `确定`, ()=>{
            let inputtxt1 = <BaseTextField>inputTF2.getChildByName("textField");
            let rstr = inputtxt1.text.split(`,`);

            let inputtxt2 = <BaseTextField>inputTFG.getChildByName("textField");
            let gstr = inputtxt2.text.split(`,`);;

            let inputtxt3 = <BaseTextField>inputTFB.getChildByName("textField");
            let bstr = inputtxt3.text.split(`,`);;

            let inputtxt4 = <BaseTextField>inputTFA.getChildByName("textField");
            let astr = inputtxt4.text.split(`,`);;

            let colorMatrix = rstr.concat(gstr).concat(bstr).concat(astr);
            let arr = [];
            for(let i in colorMatrix){
                arr[i] = Number(colorMatrix[i]);
            }
            role.filters = null;
			role.filters = [new egret.ColorMatrixFilter(arr)];
        }, view);
        view.addChildToContainer(btn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, btn, rolegroup, [0, 300]);

    }

    protected resetBgSize():void{
        super.resetBgSize();
        this.closeBtn.x = 569;
    }

    public getShowHeight():number{
        return 832;
    }

	public dispose():void{
        let view = this;
        //App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM),this.useCallback,this);
		super.dispose();
	}
}