/**
 * 	通用头衔预览
 * @author yangchengguo
 * date 2019.8.1
 * @class AcCommonTitleRewardPopupView
 */
class AcCommonTitleRewardPopupView extends PopupView {
    public _TITLE_TYPE_COMMON = 1;
    public _TITLE_TYPE_JINTONGYUNV = 2;
	public _TITLE_TYPE_JIULANGZHINV = 3;
	public _titleIds:number|string[] = [];
	public constructor() {
		super();
    }

	public initView(): void {
        let titleIds = this.param.data.titleIds;
        let bgType = this.param.data.bgType;
		let topMsg = this.param.data.topMsg;
		this._titleIds = titleIds;

        let bgStr = "accommontitlereward_bg"+bgType; //acchristmasview_rewardmidbg_4
		let bg = BaseLoadBitmap.create(bgStr);
		bg.width = 544;
		bg.height = 400;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 0);
        this.addChildToContainer(bg);

        let rect = new egret.Rectangle(0, 0, 544, 364);
        let maskContaner = new BaseDisplayObjectContainer();
        maskContaner.width = 544;
        maskContaner.height = 364;
        maskContaner.mask = rect;
        maskContaner.setPosition(bg.x + bg.width / 2 - maskContaner.width / 2, bg.y + 30);
        this.addChildToContainer(maskContaner);
        let picId:number = Api.playerVoApi.getPlayePicId();

        //一个人
        if (titleIds.length == 1 || (PlatformManager.checkIsKRSp() && titleIds.length == 2)){
			let body = this.getBodyImgById(titleIds[0]);
			if (PlatformManager.checkIsKRSp() && ResourceManager.hasRes(titleIds[0]+"_1")){
				body = this.getBodyImgById(titleIds[0]+"_1");
			}
            let skinImg = BaseLoadBitmap.create(body);
            skinImg.width = 382;
            skinImg.height = 618;
            skinImg.anchorOffsetX = skinImg.width / 2;
            skinImg.x = maskContaner.width / 2;
			skinImg.y = maskContaner.height/2 - 93;
            maskContaner.addChild(skinImg); 
            if (Api.playerVoApi.getUserSex(picId) == 2) {
                //女的
                let head = Api.playerVoApi.getUserHeadContainer();
				head.setPosition(maskContaner.width/2 - head.width/2 - 4, 0);
                maskContaner.addChild(head);
            }
            else {
                //男的
                let head = Api.playerVoApi.getUserHeadContainer();
				head.setPosition(maskContaner.width/2 - head.width/2 - 4, 0);
                maskContaner.addChild(head);
            }
        }   
        else{
			//两人
			//女
			let body2 = this.getBodyImgById(titleIds[1]+"_2");
            let skinImg2 = BaseLoadBitmap.create(body2);
            skinImg2.width = 382;
            skinImg2.height = 618;
            skinImg2.anchorOffsetX = skinImg2.width / 2;
            skinImg2.x = maskContaner.width / 4 *3 - 30;
            skinImg2.y = maskContaner.height/2 - 40;
			maskContaner.addChild(skinImg2);
			//男
            let body1 = this.getBodyImgById(titleIds[0]+"_1");
            let skinImg1 = BaseLoadBitmap.create(body1);
            skinImg1.width = 382;
            skinImg1.height = 618;
            skinImg1.anchorOffsetX = skinImg1.width / 2;
            skinImg1.x = maskContaner.width / 4 + 30;
            skinImg1.y = maskContaner.height/2 - 80;
			maskContaner.addChild(skinImg1);

            if (Api.playerVoApi.getUserSex(picId) == 2) {
                //女的
				let head1 = Api.playerVoApi.getUserHeadContainer();
                head1.setPosition(maskContaner.width/4*3 - head1.width/2 - 35, 50);
                maskContaner.addChild(head1);

                let head2 = Api.playerVoApi.getUserHeadContainer(1);
                head2.setPosition(maskContaner.width/4 - head2.width/2 + 23, 9);
				maskContaner.addChild(head2);
            }
            else {
                //男的
                let head1 = Api.playerVoApi.getUserHeadContainer();
                head1.setPosition(maskContaner.width/4 - head1.width/2 + 23, 9);
                maskContaner.addChild(head1);
				let head2 = Api.playerVoApi.getUserHeadContainer(6);
                head2.setPosition(maskContaner.width/4*3 - head2.width/2 - 35, 50);
				maskContaner.addChild(head2);
			}
        }
		
		let topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
		topbg.width = 544;
		topbg.height = 36;
		topbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - topbg.width / 2, 0);
		this.addChildToContainer(topbg);

		let topDesc = ComponentManager.getTextField(topMsg, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2);
		this.addChildToContainer(topDesc);

		let buttomBg = BaseBitmap.create("public_9_probiginnerbg");
		buttomBg.width = 530;
		buttomBg.height = 246;
		buttomBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - buttomBg.width / 2, bg.y + bg.height + 5);
		this.addChildToContainer(buttomBg);

		let buttomBg2 = BaseBitmap.create("public_9_bg14");
		buttomBg2.width = 525;
		buttomBg2.height = 234;
		buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
		this.addChildToContainer(buttomBg2);

		let titleTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("headEffect"+titleIds[0]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
		titleTipTxt.width = 480;
		titleTipTxt.lineSpacing = 3;
		titleTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - titleTipTxt.width / 2, buttomBg2.y + 20);
		this.addChildToContainer(titleTipTxt);

		let infoBg = BaseBitmap.create("public_9_managebg")
		infoBg.width = 510;
		infoBg.height = 104;
		infoBg.setPosition(buttomBg2.x + buttomBg2.width / 2 - infoBg.width / 2, titleTipTxt.y + titleTipTxt.height + 13);
		this.addChildToContainer(infoBg);
		let resultStrList = this.dealAttrChangeInfo(titleIds[0]);
		let startY = 13;
		for (let index = 0; index < resultStrList.length; index++) {
			let desc = ComponentManager.getTextField(resultStrList[index], TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
			let posX = index % 2 == 0 ? infoBg.x + 15 : infoBg.x + 280;
			let posY = infoBg.y + startY;
			desc.setPosition(posX, posY);
			this.addChildToContainer(desc);
			if (index % 2 > 0) {
				startY = startY + 28;
			}
		}

		let buttomTipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acCommonWifeSkinRewardPopupViewButtomDesc"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
		buttomTipTxt.setPosition(buttomBg2.x + buttomBg2.width / 2 - buttomTipTxt.width / 2, buttomBg2.y + buttomBg2.height - buttomTipTxt.height - 15);
		this.addChildToContainer(buttomTipTxt);
	}

	protected dealAttrChangeInfo(titleId:string|number) {
		let titleCfg = Config.TitleCfg.getTitleCfgById(titleId);
		let effect = titleCfg.effect1;
		let resultStr: string[] = [];
		
		if (effect){
			let effectStr = String(effect);
			resultStr.push(LanguageManager.getlocal("acTailAttrAdd1", [effectStr]));
			resultStr.push(LanguageManager.getlocal("acTailAttrAdd2", [effectStr]));
			resultStr.push(LanguageManager.getlocal("acTailAttrAdd3", [effectStr]));
			resultStr.push(LanguageManager.getlocal("acTailAttrAdd4", [effectStr]));
		}
		return resultStr;
    }
    
    public getBodyImgById(id:number|string):string{
        return "user_body_full_"+id;
    }

	protected getResourceList(): string[] {
		return super.getResourceList().concat([
			"skin_detail_namebg",
		]);
	}
	protected getTitleStr(): string {
		return "titleClothPriviewTitle";
	}
	// protected getShowHeight() {
	// 	return 720;
	// }
	public dispose(): void {
		super.dispose();
	}
}