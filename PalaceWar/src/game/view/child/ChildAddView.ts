//子嗣属性加成说明
class ChildAddView extends PopupView {


	public constructor() {
		super();
	}
	public initView(): void {
		let childvo : ChildInfoVo = this.param.data;
        let wifestatusVo = Api.wifestatusVoApi.getWifestatusVo();
		let starEffect = Config.WifestatusbaseCfg.starEffect;

		let bg = BaseBitmap.create("public_9_bg4");
		bg.width = 525;
		bg.height = 220;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 15);
        this.addChildToContainer(bg);
        
        let add1 = 0;
        if(Api.switchVoApi.checkOpenWifeStatus()){
            add1 = wifestatusVo.star*starEffect;
        }
        let add2 = 0;
        if(Api.switchVoApi.checkOpenQingYuanHuiJuan()){
            add2 = Api.encounterVoApi.getChildAdd(childvo.motherId);
        }
        let addstr = LanguageManager.getlocal("wifeStatusProAdd3", [(add1 + add2).toFixed(1)]);
		let topTF = ComponentManager.getTextField(addstr, 26, TextFieldConst.COLOR_WHITE);
		topTF.setPosition(bg.x + bg.width / 2 - topTF.width / 2, bg.y + 20);
		this.addChildToContainer(topTF);

        let addstr1 = LanguageManager.getlocal("wifeStatusProAdd2", [(add1).toFixed(1)]);
        let addstr2 = LanguageManager.getlocal("wifeStatusProAdd5", [(add2).toFixed(1)]);
        Api.switchVoApi.checkOpenQingYuanHuiJuan() || Api.switchVoApi.checkOpenWifeStatus()

        let topTF1 = ComponentManager.getTextField(addstr1, 26, TextFieldConst.COLOR_WHITE);
        topTF1.setPosition(bg.x + bg.width / 2 - topTF1.width / 2, topTF.y + topTF.height + 20);
        this.addChildToContainer(topTF1);
        
        let topTF2 = ComponentManager.getTextField(addstr2, 26, TextFieldConst.COLOR_WHITE);
        topTF2.setPosition(bg.x + bg.width / 2 - topTF2.width / 2, topTF1.y + topTF1.height + 20);
        this.addChildToContainer(topTF2);
        
        if(!Api.switchVoApi.checkOpenWifeStatus()){
            topTF1.visible = false;
            topTF2.y = topTF1.y;
        }
        if(!Api.switchVoApi.checkOpenQingYuanHuiJuan()){
            topTF2.visible = false;
        }

	}
	protected getTitleStr(): string {
		return "wifeStatusProAdd4";
	}
	public dispose(): void {
		super.dispose();
	}
}