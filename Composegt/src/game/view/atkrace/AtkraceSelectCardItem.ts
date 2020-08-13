class AtkraceSelectCardItem extends ScrollListItem {
    public constructor() {
        super();
    }

    private data: AtkraceSelectCardInfo;

    protected initItem(index:number,data:any) {
        this.data = data;
        this.width = 204;
        this.height = 297;

        let bg = BaseLoadBitmap.create(this.data.servantInfo.qualityBg);
        this.addChild(bg);
        bg.setPosition(5, 5);
        bg.addTouchTap(this.onTap, this);

        let servantImg = BaseLoadBitmap.create(this.data.servantInfo.fullImgPath); 
        servantImg.scaleX = servantImg.scaleY = 0.64;
        servantImg.setPosition(-95, 27);
        this.addChild(servantImg);
        let widthN:number =282-8;
        let heightN:number =335 + 6;
        let mask = new egret.Rectangle(172, 0, widthN , heightN);   
        servantImg.mask = mask;

        let lvText = ComponentManager.getTextField("" + this.data.servantInfo.level, 18, 0xfff3b9);
        this.addChild(lvText);
        lvText.width = 40;
        lvText.textAlign = TextFieldConst.ALIGH_CENTER;
        lvText.setPosition(11, 22);

        let nameText = ComponentManager.getTextField(this.data.servantInfo.servantName, TextFieldConst.FONTSIZE_CONTENT_SMALL);
        nameText.textColor = ServantScrollItem.getQualityColor(this.data.servantInfo.clv);
        nameText.width = this.width;
        nameText.textAlign = TextFieldConst.ALIGH_CENTER;
        this.addChild(nameText);
        nameText.y = 258;

        let attrBg = BaseLoadBitmap.create("public_9_bg11");
        attrBg.width = 180;
        attrBg.height = 52;
        this.addChild(attrBg);
        attrBg.setPosition(12, 189 + 5);

        let atkLabel = ComponentManager.getTextField(
            LanguageManager.getlocal("atkrace_addtext2", [""+this.data.battle]),
            20, 0xfffcdb
        );
        atkLabel.width = this.width;
        atkLabel.textAlign = TextFieldConst.ALIGH_CENTER;
        this.addChild(atkLabel);
        atkLabel.setPosition(0, attrBg.y + 3);

        let hpLabel = ComponentManager.getTextField(
            LanguageManager.getlocal("atkrace_addtext3", [""+this.data.HP]),
            20, 0xfffcdb
        );
        hpLabel.width = this.width;
        hpLabel.textAlign = TextFieldConst.ALIGH_CENTER;
        this.addChild(hpLabel);
        hpLabel.setPosition(0, attrBg.y + 27);

        let _qualityIcon = GameData.getServantQualityIconBySid(this.data.servantId);
        if (_qualityIcon) {
            this.addChild(_qualityIcon);
            _qualityIcon.setScale(0.5);
            _qualityIcon.setPosition(127, -34);
        }

        if (this.data.isSelect) {
            let light_mask = BaseLoadBitmap.create("atkrace_select1");
            this.addChild(light_mask);
            light_mask.setPosition(-5, -5);

            let select_icon = BaseLoadBitmap.create("atkrace_select2");
            this.addChild(select_icon);
            select_icon.setPosition(10, 47);
        }
    }

    private onTap() {
        this.data.callback && this.data.callback.call(this.data.callbackObj, this.data.servantInfo);
    }

    public dispose() {
        this.data = null;
        super.dispose();
    }
}

interface AtkraceSelectCardInfo {
    callback: (servant: ServantInfoVo) => void,
    callbackObj: any,
    servantId: string,
    servantInfo: ServantInfoVo,
    battle: number,
    HP: number,
    isSelect: boolean
}