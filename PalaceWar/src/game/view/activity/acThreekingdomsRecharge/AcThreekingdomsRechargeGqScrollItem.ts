/**
 * 三国Item
 * author ycg
 * date 2020.1.14
 * @class AcThreekingdomsRechargeGqScrollItem
 */
class AcThreekingdomsRechargeGqScrollItem extends ScrollListItem {
    private _code:string;
    private _mask:BaseBitmap = null;
    private _flag:BaseBitmap = null;

	public constructor() {
		super();
	}

	public initItem(index: number, data: any, itemParam: any): void {
        this._code = itemParam.code;
        let vo = <AcThreekingdomsRechargeVo>Api.acVoApi.getActivityVoByAidAndCode(itemParam.aid, this._code);
        // let bgIndex = index + 1;
        // if (bgIndex > 5){
        //     bgIndex = bgIndex - 5;
        // }
        let bgIndex = index % 5 + 1;
        let bgImg = ResourceManager.hasRes("acthreekingdomsrecharge_guanqiaitembg-"+this.getTypeCode()+"_"+bgIndex) ? "acthreekingdomsrecharge_guanqiaitembg-"+this.getTypeCode()+"_"+bgIndex : "acthreekingdomsrecharge_guanqiaitembg-1"+"_"+bgIndex;
        let bg = BaseBitmap.create(bgImg);
        this.addChild(bg);
        this.width = bg.width;
        this.height = bg.height;

        //名字
        let nameBg = BaseBitmap.create("acthreekingdomsrecharge_guanqiaitem_nambg");
        nameBg.setPosition(bg.x + bg.width/2 - nameBg.width/2, bg.y + bg.height - nameBg.height);
        this.addChild(nameBg);
        let name = ComponentManager.getTextField(LanguageManager.getlocal("acThreekingdomsRechargeGuanqiaItemName-"+this.getTypeCode()+"_"+(index+1)), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        name.setPosition(nameBg.x + nameBg.width/2 - name.width/2, nameBg.y + nameBg.height/2 - name.height/2);
        this.addChild(name);

        //距离
        let distanceBg = BaseBitmap.create("acthreekingdomsrecharge_distancenumbg");
        distanceBg.setPosition(bg.x + bg.width - distanceBg.width, bg.y + 2);
        this.addChild(distanceBg);
        let distance = ComponentManager.getTextField(LanguageManager.getlocal("acThreekingdomsRechargeProgressDistance-"+this.getTypeCode(), [""+data.specialnum]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        distance.setPosition(distanceBg.x + distanceBg.width/2 - distance.width/2, distanceBg.y + distanceBg.height/2 - distance.height/2);
        this.addChild(distance);

        //遮罩
        // let mask = BaseBitmap.create("public_9_viewmask");
        // mask.width = bg.width;
        // mask.height = bg.height;
        // mask.setPosition(bg.x, bg.y);
        // this.addChild(mask);
        // mask.visible = false;
        // this._mask = mask;

        //flag
        let flagImg = ResourceManager.hasRes("acthreekingdomsrecharge_killitemflag-"+this.getTypeCode()) ? "acthreekingdomsrecharge_killitemflag-"+this.getTypeCode() : "acthreekingdomsrecharge_killitemflag-1";
        let flag = BaseBitmap.create(flagImg);
        flag.anchorOffsetX = flag.width/2;
        flag.anchorOffsetY = flag.height/2;
        flag.setPosition(bg.x + bg.width/2, bg.y + bg.height/2);
        this.addChild(flag);
        flag.visible = false;
        this._flag = flag;

        let guanqiaId = vo.getCurrGuanqiaId();
        if (guanqiaId == -1 || guanqiaId > index){
            flag.visible = true;
        }
        else{
            flag.visible = false;
        }
    }

    public playFlagAni():void{
        this._flag.visible = true;
        this._flag.setScale(2.5);
        egret.Tween.get(this._flag).wait(200).to({scaleX: 1, scaleY: 1}, 100, egret.Ease.sineOut).to({x: this._flag.x + 1, y: this._flag.y + 1}, 50).to({x: this._flag.x - 1, y: this._flag.y - 1}, 80).to({x: this._flag.x, y: this._flag.y}, 50);
    }

    public getTypeCode():string{
		if (this._code == "2"){
			return "1";
        }
        else if (this._code == "4"){
            return "3";
        }
        else if (this._code == "6"){
            return "5";
        }
        else if (this._code == "8"){
            return "7";
        }
        else if (this._code == "10"){
            return "9";
        }
		return this._code;
    }

	public getSpaceX(): number {
		return 3;
	}

	public dispose(): void {

		super.dispose();
	}

}