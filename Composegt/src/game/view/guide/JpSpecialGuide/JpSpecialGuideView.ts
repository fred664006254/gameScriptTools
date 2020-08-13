/*
* 日本特有新手引导
*/

class JpSpecialGuideView extends CommonView {

    private guideBg: BaseLoadBitmap = null;
    private lightPointList: BaseLoadBitmap[] = [];
    private descTxt: BaseTextField = null;
    private leftBtn: BaseButton = null;
    private rightBtn: BaseButton = null;

    private step: number = 0;
    private maxStep:number = 0;

    public constructor() {
        super();
        //this.initView();
    }

    private getPos(type: number): { x: number, y: number } {
        if (type == 1) {
            return { x: this.guideBg.x + this.guideBg.width / 2 - this.leftBtn.width / 2 - 150, y: this.guideBg.y + this.guideBg.height + 30 };
        } else if (type == 2) {
            return { x: this.guideBg.x + this.guideBg.width / 2 - this.leftBtn.width / 2, y: this.guideBg.y + this.guideBg.height + 30 };
        } else if (type == 3) {
            return { x: this.guideBg.x + this.guideBg.width / 2 - this.leftBtn.width / 2 + 150, y: this.guideBg.y + this.guideBg.height + 30 };
        }

    }
    protected initView(): void {
        this.width = GameConfig.stageWidth;
        this.height = GameConfig.stageHeigth;
        let viewBg = BaseBitmap.create('public_9_black');
        viewBg.alpha = 0.8;
        viewBg.width = this.width;
        viewBg.height = this.height;
        this.addChild(viewBg)
        viewBg.addTouchTap(()=>{},this);
        this.step = 1;
        this.maxStep = 5;
        this.guideBg = BaseLoadBitmap.create("jpspecialguide_guidebg" + this.step);
        this.guideBg.width = 640;
        this.guideBg.height = 858;
        this.addChild(this.guideBg);


        this.descTxt = ComponentManager.getTextField(LanguageManager.getlocal("JpSpecialGuideTip" + this.step), 18);
        this.addChild(this.descTxt);
        this.descTxt.width = this.guideBg.width - 40;
        this.descTxt.setPosition(this.guideBg.x + 30, this.guideBg.y + this.guideBg.height - 95);
        this.descTxt.lineSpacing = 5;

        let pointCon = new BaseDisplayObjectContainer();
        for (let i = 0; i < 5; i++) {
            let grayPoint = BaseLoadBitmap.create("jpspecialguide_graypoint");
            let lightPoint = BaseLoadBitmap.create("jpspecialguide_lightpoint");
            grayPoint.width = grayPoint.height = lightPoint.width = lightPoint.height = 14;
            grayPoint.x = lightPoint.x = i * 40;
            pointCon.addChild(grayPoint);
            pointCon.addChild(lightPoint);
            this.lightPointList.push(lightPoint);
        }
        for (let index = 0; index < this.lightPointList.length; index++) {
            const element = this.lightPointList[index];
            element.visible = index == (this.step - 1);
        }

        this.addChild(pointCon);
        pointCon.setPosition(this.guideBg.x + this.guideBg.width / 2 - pointCon.width / 2, this.guideBg.y + this.guideBg.height + 10);

        this.leftBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "JpSpecialGuideLeftBtn", this.onBtnClick, this);
        this.rightBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "JpSpecialGuideRightBtn", this.onBtnClick, this, [1]);
        this.addChild(this.leftBtn);
        this.addChild(this.rightBtn);
        this.rightBtn.setPosition(this.getPos(2).x, this.getPos(2).y);
        this.leftBtn.visible = false;
    }

    private refreshUIInfo() {
        this.guideBg.setload("jpspecialguide_guidebg" + this.step);
        this.descTxt.text = LanguageManager.getlocal("JpSpecialGuideTip" + this.step);
        for (let index = 0; index < this.lightPointList.length; index++) {
            const element = this.lightPointList[index];
            element.visible = index == (this.step - 1);
        }
        if (this.step == 1) {
            this.leftBtn.visible = false;
            this.rightBtn.visible = true;
            this.rightBtn.setPosition(this.getPos(2).x, this.getPos(2).y);
            this.rightBtn.setText("JpSpecialGuideRightBtn",true);
        }else if(this.step == this.maxStep){
            this.rightBtn.setText("close",true);
        }else{
            this.leftBtn.visible = true;
            this.rightBtn.visible = true;
            this.leftBtn.setPosition(this.getPos(1).x, this.getPos(1).y);
            this.rightBtn.setPosition(this.getPos(3).x, this.getPos(3).y);
            this.rightBtn.setText("JpSpecialGuideRightBtn",true);


        }

    }

    private onBtnClick(param: any) {
        if (param) {
            if(this.step == this.maxStep){
                this.hide();
                return;
            }
            this.step += 1;
        } else {
            this.step -= 1;
        }
        this.refreshUIInfo()
    }


    protected getBgName(): string {
        return "";
    }

    protected getTitleBgName(): string {
        return "";
    }
    protected getTitleStr(): string {
        return "";
    }
    protected getCloseBtnName():string {
        return "";
    }

    // protected getResourceList(): string[] {
    //     return super.getResourceList().concat([
    //         "jpspecialguide_graypoint",
    //         "jpspecialguide_guidebg1",
    //         "jpspecialguide_guidebg2",
    //         "jpspecialguide_guidebg3",
    //         "jpspecialguide_guidebg4",
    //         "jpspecialguide_guidebg5",
    //         "jpspecialguide_lightpoint",
    //     ]);
    // }

    public hide() {
        Api.rookieVoApi.checkWaitingGuide();
        super.hide();
    }
    public dispose(): void {
        this.guideBg = null;
        this.lightPointList = [];
        this.descTxt = null;
        this.leftBtn = null;
        this.rightBtn = null;
        this.step = 0;
        this.maxStep = 0;
        super.dispose();
    }
}