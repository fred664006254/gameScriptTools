//子嗣属性加成说明
class ChildEventView extends PopupView {

    private _selIndex = -1;
    private _wordbg:BaseBitmap = null;
	public constructor() {
		super();
    }
    
	public initView(): void {

        //1 选择事件  2 通知事件
        let type = this.param.data.type;
        if(type == 1){
            let titlebg = BaseBitmap.create("childeventtitlebg");
		    titlebg.setPosition(18, -35);
            this.addChildToContainer(titlebg);

            let namebg = BaseBitmap.create("childeventnamebg");
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, namebg, titlebg);
            this.addChildToContainer(namebg);

            let nameTxt = ComponentManager.getTextField(LanguageManager.getlocal(`childeventviewtitle`), 22, TextFieldConst.COLOR_BLACK);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, namebg);
            this.addChildToContainer(nameTxt);

            let flower = BaseBitmap.create("childeventflower");
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, flower, titlebg);
            this.addChildToContainer(flower);

            let kuang = BaseBitmap.create(`childeventkuang2`);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, kuang, titlebg, [0,titlebg.height+20]);
            this.addChildToContainer(kuang);

            let bg = BaseLoadBitmap.create(`childeventbg1`);
            bg.width = 546;
            bg.height = 154
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, bg, kuang, [0,-3]);
            this.addChildToContainer(bg);

            let wordbg = BaseBitmap.create(`childeventwordbg`);
            wordbg.width = 536;
            this.addChildToContainer(wordbg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, wordbg, kuang, [0,kuang.height+10]);
            this._wordbg = wordbg;

            let wordTxt = ComponentManager.getTextField(LanguageManager.getlocal(`childeventtip2`, [this.param.data.childname, this.param.data.mname,LanguageManager.getlocal(`childeventsex${this.param.data.sex}`)]), 20, TextFieldConst.COLOR_BLACK);
            wordTxt.width = wordbg.width - 30;
            wordTxt.textAlign = egret.HorizontalAlign.LEFT;
            wordTxt.lineSpacing = 5;

            wordbg.scaleY = (wordTxt.textHeight + 30) / 121;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, wordTxt, wordbg);
            this.addChildToContainer(wordTxt);
            

            for(let i = 1; i < 5; ++ i){
                let namebg = BaseBitmap.create(`childeventtype${i}`);
                namebg.x = wordbg.x + (i % 2 == 0 ? 270 : -7);
                namebg.y = wordbg.y + wordbg.height * wordbg.scaleY + 5 + (i / 2 > 1 ? 70 : 0)
                
                let selectbg = BaseBitmap.create(`childeventselectbg`);
                selectbg.x = namebg.x + namebg.width - 10;
                selectbg.y = namebg.y + (namebg.height - selectbg.height) / 2;
                this.addChildToContainer(selectbg);
                selectbg.addTouchTap(()=>{
                    if(this._selIndex == -1){
                        this._selIndex = i;
                        let collectFlag = BaseBitmap.create("childeventselected")
                        collectFlag.anchorOffsetX = collectFlag.width/2;
                        collectFlag.anchorOffsetY = collectFlag.height/2;
                        collectFlag.setScale(0.7);
                        collectFlag.x = selectbg.x + selectbg.width - collectFlag.width * collectFlag.scaleX / 2;
                        collectFlag.y = selectbg.y + selectbg.height / 2;
                        this.addChildToContainer(collectFlag);
                        collectFlag.visible = false;

                        collectFlag.setScale(1.3);
                        collectFlag.visible = true;
                        egret.Tween.get(collectFlag).to({scaleX:0.7,scaleY:0.7},300).call(()=>{
                            this.freshView(i);
                        }, this).wait(500).call(()=>{
                            this.hide();
                        }, this);
                    }
                }, this);

                this.addChildToContainer(namebg);
                selectbg.name = `selectbg${i}`;

                let nameTxt = ComponentManager.getTextField(LanguageManager.getlocal(`childevent${i}`), 20, TextFieldConst.COLOR_BLACK);
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, nameTxt, selectbg, [17,0]);
                this.addChildToContainer(nameTxt);
            }

            let line = BaseBitmap.create(`childeventline`);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, wordbg, [0,wordbg.height * wordbg.scaleY+130]);
            this.addChildToContainer(line);

            let tiptxt = ComponentManager.getTextField(LanguageManager.getlocal(`childeventtip1`), 20, TextFieldConst.COLOR_BLACK);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tiptxt, line, [0, line.height + 5]);
            this.addChildToContainer(tiptxt);
        }
        else{
            let flower = BaseBitmap.create("childeventflower");
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, flower, this.viewBg, [0,-flower.height/2]);
            this.addChildToContainer(flower);

            let kuang = BaseBitmap.create(`childeventkuang1`);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, kuang, this.viewBg, [4,20]);
            this.addChildToContainer(kuang);

            let bgres = ``; 
            if(type == 4){
                bgres = `childeventbg${type}`;
            }
            else{
                bgres = `childeventbg${type}_${this.param.data.eventtype}`;
            }
            let bg = BaseLoadBitmap.create(bgres);
            bg.width = 546;
            bg.height = 224;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, bg, kuang, [0,-3]);
            this.addChildToContainer(bg);

            let wordbg = BaseBitmap.create(`childeventwordbg`);
            wordbg.width = 480;
            this.addChildToContainer(wordbg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, wordbg, kuang, [65,kuang.height+10]);

            let typebg = BaseBitmap.create(`childeventtype${this.param.data.eventtype}`);
            typebg.x = kuang.x;
            this.addChildToContainer(typebg);

            let wordTxt = ComponentManager.getTextField(LanguageManager.getlocal(`childevent${type}_${type == 4 ? 1 : this.param.data.eventtype}_tip${type == 4 ? 1 : App.MathUtil.getRandom(1,6)}`, [this.param.data.childname]), 20, TextFieldConst.COLOR_BLACK);
            wordTxt.width = wordbg.width - 30;
            wordTxt.textAlign = egret.HorizontalAlign.LEFT;
            wordTxt.lineSpacing = 5;
            wordbg.scaleY = (wordTxt.textHeight + 30) / 121;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, wordTxt, wordbg);
            this.addChildToContainer(wordTxt);
            this._wordbg = wordbg;

            typebg.y = wordTxt.y + (wordTxt.height - typebg.height) / 2;

            if(type > 1){
                let jzhou = BaseBitmap.create(`public_9_bg87`);
                jzhou.y = this._wordbg.y+this._wordbg.height*this._wordbg.scaleY+ 15;
                this.addChildToContainer(jzhou);
        
                let tiptxt = ComponentManager.getTextField(LanguageManager.getlocal(`childeventtip3`, [this.param.data.childname, LanguageManager.getlocal(`servantInfo_speciality${this.param.data.eventtype}`), this.param.data.num]), 20, TextFieldConst.COLOR_BLACK);
                jzhou.width = tiptxt.width+80;
                jzhou.x = this.viewBg.width/2 - jzhou.width/2;

                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tiptxt, jzhou, [0,7]);
                this.addChildToContainer(tiptxt);

                let closeText:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("childeventclosetip"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
                closeText.textAlign = egret.HorizontalAlign.CENTER;
                closeText.setPosition((GameConfig.stageWidth-closeText.width)/2,GameConfig.stageHeigth/2 + this.getShowHeight()/2);
                this.addChild(closeText);
            }
        }
		
    }

    // protected resetBgSize():void{
    //     super.resetBgSize();
    //     let type = this.param.data.type;
    //     if(type > 1){
    //         // let jzhou = BaseBitmap.create(`childeventjzhou`);
    //         // jzhou.width = 600;
    //         // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, jzhou, this.viewBg, [0]);
    //         // jzhou.y = this.viewBg.y + this.viewBg.height + 15;
    //         // this.addChild(jzhou);
    
    //         // let tiptxt = ComponentManager.getTextField(LanguageManager.getlocal(`childeventtip3`, [this.param.data.childname, LanguageManager.getlocal(`servantInfo_speciality${this.param.data.eventtype}`), this.param.data.num]), 20, TextFieldConst.COLOR_BLACK);
    //         // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tiptxt, jzhou, [0,38]);
    //         // this.addChild(tiptxt);

    //         // let closeText:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("childeventclosetip"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
    //         // closeText.textAlign = egret.HorizontalAlign.CENTER;
    //         // closeText.setPosition((GameConfig.stageWidth-closeText.width)/2,jzhou.y+jzhou.height+25);
    //         // this.addChild(closeText);

    //         let jzhou = BaseBitmap.create(`public_9_bg87`);
           
    //         jzhou.y = this._wordbg.y+this._wordbg.height*this._wordbg.scaleY+ 25;
    //         this.addChildToContainer(jzhou);
    
    //         let tiptxt = ComponentManager.getTextField(LanguageManager.getlocal(`childeventtip3`, [this.param.data.childname, LanguageManager.getlocal(`servantInfo_speciality${this.param.data.eventtype}`), this.param.data.num]), 20, TextFieldConst.COLOR_BLACK);
           
    //         jzhou.width = tiptxt.width+80;
    //         jzhou.x = this.viewBg.width/2 - jzhou.width/2;

    //         App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tiptxt, jzhou, [0,7]);
    //         this.addChildToContainer(tiptxt);

    //         let closeText:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("childeventclosetip"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
    //         closeText.textAlign = egret.HorizontalAlign.CENTER;
    //         closeText.setPosition((GameConfig.stageWidth-closeText.width)/2,this.viewBg.y + this.viewBg.height);
    //         this.addChild(closeText);
    //     }
    // }

    protected isTouchMaskClose():boolean{
        let type = this.param.data.type;
        return type > 1;
    }

    protected getCloseBtnName():string{
        return null;
    }

    private freshView(index : number):void{
        let view = this;
        for(let i = 1; i < 5; ++ i){
            let bg = <BaseBitmap>view.container.getChildByName(`selectbg${i}`);
            if(bg && i != index){
                bg.setRes(`childeventselectbg2`);
            }
        }
    }
    
	protected getTitleStr(): string {
		return "";
    }
    
    protected getBgName():string{
        return "childeventdban";
    }

    protected getTitleBgName():string{
        return null;
    }

    protected getShowHeight():number{
        let type = this.param.data.type;
       return type == 1 ? 0 : 473;
    }

    // protected getShowHeight():number{
    //     let type = this.param.data.type;
    //     return type == 1 ? 540 : 425;
    // }

    protected getResourceList():string[]{
        return super.getResourceList().concat(`childeventview`); 
    }
    

    public hide():void{
        if(this.param.data.callfunc){
            this.param.data.callfunc.apply(this.param.data.callobj, [this._selIndex]);
        }
        super.hide();
    }

	public dispose(): void {
        this._selIndex = -1;
        this._wordbg = null;
		super.dispose();
	}
}