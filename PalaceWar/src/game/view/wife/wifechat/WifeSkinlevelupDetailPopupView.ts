/**
 * 解锁道具详情弹板
 * author qianjun
 * date 2017/9/19
 * @class ItemInfoPopupView
 */
class WifeSkinlevelupDetailPopupView extends PopupView
{
	private _sound = ``;
	public constructor() 
	{
		super();
	}

	protected initView():void
	{
        let data = this.param.data;
        let skinLevel = Api.wifeSkinVoApi.getWifeSkinLV(data.skinId);

        let bg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		bg.width = 530;
		bg.height = 220;
		bg.x = 20+GameData.popupviewOffsetX;
		bg.y = 19;
		this.addChildToContainer(bg);
		
		
		let itemName:string = data.text;
		let effectDesc:string = LanguageManager.getlocal(`wifeskinlevelupget${data.data.type}`);
		let dropDesc:string = LanguageManager.getlocal(`wifeskinlevelupunlock`, [data.data.level]);
		let effectTitle:string = LanguageManager.getlocal("wifeSkillLock");
		let dropTitle:string = LanguageManager.getlocal("wifeskinlevelupUnLockNeed");

		this.titleTF.text = itemName;
		let icon = BaseBitmap.create(data.icon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, icon, bg, [24+GameData.popupviewOffsetX,0]);
        this.addChildToContainer(icon);
        
        let iconnamebg = BaseBitmap.create(`wifeskinleveliconbg`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, iconnamebg, icon, [0,-10]);
        this.addChildToContainer(iconnamebg);

        let iconTxt = ComponentManager.getTextField(itemName, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, iconTxt, iconnamebg);
        this.addChildToContainer(iconTxt);

		let effectTitleTF:BaseTextField = ComponentManager.getTextField(effectTitle,TextFieldConst.FONTSIZE_CONTENT_SMALL);;
		effectTitleTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
		effectTitleTF.x = 200+GameData.popupviewOffsetX;
		effectTitleTF.y = 95;
		this.addChildToContainer(effectTitleTF);

		let effectDescTF:BaseTextField = ComponentManager.getTextField(effectDesc,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		effectDescTF.x = effectTitleTF.x + effectTitleTF.width;
		effectDescTF.y = effectTitleTF.y;
		effectDescTF.width = 300;
		this.addChildToContainer(effectDescTF);

		let dropTitleTF:BaseTextField = ComponentManager.getTextField(dropTitle,TextFieldConst.FONTSIZE_CONTENT_SMALL);;
		dropTitleTF.setColor(TextFieldConst.COLOR_LIGHT_YELLOW);
		dropTitleTF.x = 200+GameData.popupviewOffsetX;
		dropTitleTF.y = 140;
		this.addChildToContainer(dropTitleTF);

		// if ((effectDescTF.y+effectDescTF.height)>100)
		// {
		// 	dropTitleTF.y = effectDescTF.y+effectDescTF.height+12;
		// }

		let dropDescTF:BaseTextField = ComponentManager.getTextField(dropDesc,TextFieldConst.FONTSIZE_CONTENT_SMALL, skinLevel >= data.data.level ? 0xffffff : TextFieldConst.COLOR_WARN_RED3);
		dropDescTF.x = dropTitleTF.x + dropTitleTF.width;
		dropDescTF.y = dropTitleTF.y;
		dropDescTF.width = 300;
		this.addChildToContainer(dropDescTF);

		let btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, `wifeskinlevelupbtn${data.data.type}`, ()=>{
			let skincfg = Config.WifeskinCfg.getWifeCfgById(data.skinId);
			let wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(skincfg.wifeId);
			let lv = data.data.level;
			let id = skincfg.levelUp[lv - 1].levelUpUnlock;
			if(data.data.type == `avg`){
                if(btn.getIsGray()){
                    let cfg = Config.WifeskinCfg.getWifeCfgById(data.skinId);
                    App.CommonUtil.showTip(LanguageManager.getlocal(`wifeskinlvunlock2`, [cfg.name, data.data.level]));
                }
                else{

					let cfg = Config.WifeconversationCfg.getConversatiById(id);
					if(cfg){
						ViewController.getInstance().openView(ViewConst.COMMON.WIFECHATAVGVIEW, {
							lv : data.data.level,
							skinId : data.skinId,
						});
					}
					else{
						App.CommonUtil.showTip(LanguageManager.getlocal(`没有配置`));
					}
			

                    // ViewController.getInstance().openView(ViewConst.POPUP.WIFECHATSELECTVIEW, {
                    //     skinId : data.skinId,
                    // });
                    this.hide();
                }
            }
            else if(data.data.type == `scene`){
                let baseview : any = ViewController.getInstance().getView(ViewConst.POPUP.WIFESKINNEWVIEW);
                if(baseview){
                    baseview.clickChangeToBg(`${data.skinId}_${data.data.data.levelUpUnlock}`);
                    let view2 : any = ViewController.getInstance().getView(ViewConst.COMMON.WIFESKINLEVELUPVIEW);
                    view2.hide();
                    this.hide();
                }
            }
            else if(data.data.type == `sound`){
                SoundManager.playEffect(`effect_wifeskin_${id}`);
				btn.setEnable(false);
				this._sound = `effect_wifeskin_${id}`;
                egret.Tween.get(this).wait(5000).call(()=>{
                    btn.setEnable(true);
                }, this);
            }
        }, this);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, bg, [0,bg.height+10]);
        this.addChildToContainer(btn);

        if(data.isnew){
            let isnew = BaseBitmap.create(`wifeskinleveltip`);
            isnew.setScale(0.5);
            App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, isnew, btn, [-isnew.width/4, -isnew.height/4]);
            this.addChildToContainer(isnew);
        }

        if(data.data.type == `avg` && skinLevel < data.data.level){
            btn.setGray(true);
        }
	}

	protected isTouchMaskClose():boolean
	{
		return true;
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([]);
	}

	public dispose():void
	{
		if(this._sound != ``){
			SoundManager.stopEffect(this._sound);
			this._sound = ``;
		}
		super.dispose();
	}
}