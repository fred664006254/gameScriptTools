class ServantSkillDetail extends BaseDisplayObjectContainer {
    public constructor() {
        super();
        this.initView();
    }

    // private static _instance: ServantSkillDetail;
    // public static get instance(): ServantSkillDetail {
    //     if (!this._instance) {
    //         this._instance = new ServantSkillDetail();
    //     }
    //     return this._instance;
    // }
    // public static destory() {
    //     this._instance = null;
    // }

    private _bg: BaseBitmap;
    private _icon: BaseLoadBitmap;
    private _line: BaseBitmap;
    private _desLabel: BaseTextField;

    // private _layer: egret.DisplayObjectContainer = null;

    private skillData: ServantSkillBarParams = null;

    private _init: boolean = false;

    private initView() {
        this._init = true;

        this.width = 402;
        this._bg = BaseBitmap.create("public_skilldetail_bg");
        this._bg.width = this.width;
        this._bg.height = 144;
        this.addChild(this._bg);

        this._line = BaseBitmap.create("public_skilldetail_line");
        this.addChild(this._line);
        this._line.setPosition(110, 18);

        this._icon = BaseLoadBitmap.create("");
        this.addChild(this._icon);
        this._icon.width = 65;
        this._icon.height = 65;
        this._icon.x = 32;

        this._desLabel = ComponentManager.getTextField("", 18, 0xffffff);
        this.addChild(this._desLabel);
        this._desLabel.width = 236;
        this._desLabel.lineSpacing = 6;
        this._desLabel.setPosition(124, 24);
        // this.visible = false;
        this.touchEnabled = true;
    }

    public showSkill(skill: ServantSkillBarParams, layer: egret.DisplayObjectContainer, pos: egret.Point, iconSize: number) {
        if (!skill || (this.skillData && this.skillData.skillid == skill.skillid)) {
            this.hide();
        } else {
            this.skillData = skill;
            this.show(layer, pos, iconSize);
        }
    }

    private show(layer:egret.DisplayObjectContainer, pos: egret.Point, iconSize: number) {
        if (!this._init) {
            this.initView();
        }
        if (this.parent && this.parent != layer) {
            this.parent.removeChild(this);
        }
        if (!this.parent) {
            layer.addChild(this);
        }
        // this.visible = true;
        
        this._desLabel.text = "<font color=0xfdd58f size=20>" + this.skillData.skillname + "</font>\n" + this.skillData.des;
        this.height = this._desLabel.height + 50;
        if (this.height < 144) {
            this.height = 144;
        }
        this._bg.height = this.height;
        this._line.height = this.height - 36;
        this._icon.texture = ResourceManager.getRes(this.skillData.icon);
        this._icon.y = (this.height - 65) / 2;
        
        this.adaptPosition(pos, iconSize);

        GameConfig.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGlobalTap, this);
        GameConfig.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onGlobalTap, this);
        GameConfig.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGlobalTap, this);
    }
    public hide() {
        this.skillData = null;
        this.parent && this.parent.removeChild(this);
        GameConfig.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onGlobalTap, this);
        GameConfig.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGlobalTap, this);
        GameConfig.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onGlobalTap, this);
        // this.visible = false;
    }

    private adaptPosition(pos: egret.Point, iconSize: number) {
        if (pos.y >= GameConfig.stageHeigth / 2) {
            this.setPosition(pos.x + ((iconSize -this.width) / 2), pos.y - this.height - 10);
        } else {
            this.setPosition(pos.x + ((iconSize -this.width) / 2), pos.y + iconSize + 10);
        }

        let _p = this.localToGlobal();
        if (_p.x < 0) {
            this.x -= _p.x;
        }

        if (_p.x + this.width > GameConfig.stageWidth) {
            this.x += GameConfig.stageWidth - _p.x - this.width;
        }

        // let _p = this.localToGlobal();
        // const dx = GameConfig.stageWidth - _p.x;
        // if (dx < this.width) {
        //     this.x += dx - this.width;
        // }
    }

    private onGlobalTap(e: egret.TouchEvent) {
        if (e.type == egret.TouchEvent.TOUCH_BEGIN || e.type == egret.TouchEvent.TOUCH_TAP) {
            if (!e.target.isSkillDetail && !e.target.isSkillIcon) {
                this.hide();
            }
        } else if (e.type == egret.TouchEvent.TOUCH_MOVE) {
            this.hide();
        }
    }

    public get isSkillDetail(): boolean {
        return true;
    }

    public get showId(): string {
        return this.skillData ? this.skillData.skillid : null;
    }

    public dispose() {
        this._init = false;
        this._bg = null;
        this._line = null;
        this._icon = null;
        this._desLabel = null;

        super.dispose();
    }
}