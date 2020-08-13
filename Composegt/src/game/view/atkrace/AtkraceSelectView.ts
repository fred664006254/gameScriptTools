/**
 * 选择上阵门客
 */

class AtkraceSelectView extends CommonView {
    public constructor() {
        super();
    }

    // private readonly colorRed = 

    /**
     * 战斗类型
     * 1-随机敌人  choose
     * 2-复仇  revenge
     * 3-追杀  kill
     * 4-挑战  challenge
     */
    private fightType: number;
    /**
     * 挑战对手UID
     */
    private fightUid: number;
    /**消耗道具ID */
    private costId: string;

    private _cardList: ScrollList;
    private _cardData: AtkraceSelectCardInfo[];

    private _selectList: ServantInfoVo[];

    private IconBox: BaseDisplayObjectContainer;
    private _selectIcon: AtkraceSelectIconItem[];
    private startPos: number[];
    private hasMove: boolean = false;
    private handleIcon: AtkraceSelectIconItem;
    
    private challengeBtn: BaseButton;
    private challengeNum: BaseTextField;
    private challengeIcon: BaseLoadBitmap;

    private freeNum: number = 0;
    private freeMax: number = 2;

    protected initView() {
        // Api.rookieVoApi.checkNextStep();
        this.fightType = this.param.data.fightType;
        this.fightUid = this.param.data.fightUid || null;
        this.costId = Config.AtkraceCfg.getCostId(this.fightType);
        
        this.initCardListInfo();

        // let topLineBg = BaseBitmap.create("commonview_border3");
		// topLineBg.width=620;
		// topLineBg.x = this.viewBg.width/2 - topLineBg.width/2;
		// topLineBg.y = -10; 
		// this.addChildToContainer(topLineBg);

		let topBg = BaseBitmap.create("commonview_redtitle");
		topBg.x = this.viewBg.width/2 - topBg.width/2;
		topBg.y = -22;
		this.addChildToContainer(topBg);

        let servantNumTxt = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		servantNumTxt.text = LanguageManager.getlocal("servant_count") + this._cardData.length;
        servantNumTxt.setPosition(topBg.x + 26, topBg.y + 24);
		this.addChildToContainer(servantNumTxt);

        let lvTipLabel = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
        this.addChildToContainer(lvTipLabel);
        lvTipLabel.text = LanguageManager.getlocal("atkrace_addtext18", [""+Config.AtkraceCfg.getServantLv()]);
        lvTipLabel.width = topBg.width - 40;
        lvTipLabel.setPosition(topBg.x + 20, topBg.y + 24);
        lvTipLabel.textAlign = TextFieldConst.ALIGH_RIGHT;

        const list_w = 612;
        const list_h = GameConfig.stageHeigth - 168 - this.container.y - topBg.y - topBg.height;
        this._cardList = ComponentManager.getScrollList(AtkraceSelectCardItem, [], new egret.Rectangle(0, 0, list_w, list_h));
        this.addChildToContainer(this._cardList);
        this._cardList.setPosition(this.viewBg.width/2 - list_w/2, topBg.y + topBg.height);
        this.refreshCards();


        let bottomBox = new BaseDisplayObjectContainer();
        this.addChildToContainer(bottomBox);
        bottomBox.y = GameConfig.stageHeigth - 168 - this.container.y;

        let bottomBg = BaseBitmap.create("public_9v_bg14");
        bottomBox.addChild(bottomBg);
        bottomBg.width = 604;
        bottomBg.height = 132;
        bottomBg.setPosition(this.viewBg.width/2 - bottomBg.width/2, 10);

        let bottomBg2 = BaseBitmap.create("public_9v_bg12");
        bottomBox.addChild(bottomBg2);
        bottomBg2.width = bottomBg.width - 20;
        bottomBg2.height = bottomBg.height - 4;
        bottomBg2.setPosition(bottomBg.x + 10, bottomBg.y + 2);
        
        let fgline = BaseBitmap.create("commonview_border3");
        fgline.width = 620;
        bottomBox.addChild(fgline);
        fgline.setPosition(this.viewBg.width/2 - fgline.width/2, 0);

        let __cgName = this.freeNum > 0 ? "atkrace_addtext5" : "atkrace_addtext4";
        this.challengeBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, __cgName, this.onChallengeTap, this);
        bottomBox.addChild(this.challengeBtn);
        this.challengeBtn.setPosition(480, 24);

        this.challengeNum = ComponentManager.getTextField("2/3", 20, TextFieldConst.COLOR_BROWN_NEW);
        bottomBox.addChild(this.challengeNum);
        this.challengeNum.width = 130;
        this.challengeNum.textAlign = TextFieldConst.ALIGH_CENTER;
        this.challengeNum.setPosition(480, 94);

        this.challengeIcon = BaseLoadBitmap.create("itemicon"+this.costId);
        bottomBox.addChild(this.challengeIcon);
        this.challengeIcon.width = 47;
        this.challengeIcon.height = 41;
        this.challengeIcon.setPosition(480, 84);
        this.challengeIcon.visible = false;


        const icon_x = 36;
        const icon_y = bottomBox.y + 32;
        for (let i=0;i<5;i++) {
            let _icon_bg = BaseLoadBitmap.create("servant_cardbg_0");
            this.addChildToContainer(_icon_bg);
            _icon_bg.width = _icon_bg.height = 82;
            _icon_bg.setPosition(icon_x + 89 * i, icon_y);
        }

        this.IconBox = new BaseDisplayObjectContainer();
        this.addChildToContainer(this.IconBox);
        this.IconBox.setPosition(icon_x, icon_y);
        this._selectIcon = [];
        this._selectList.forEach((v, i) => {
            let __icon = new AtkraceSelectIconItem();
            __icon.refreshView({index: i, servant: v});
            this.IconBox.addChild(__icon);
            this._selectIcon[i] = __icon;
        });

        this.IconBox.addTouch(this.onIconTouch, this);

        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT,this.doGuide,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_CHALLENGE), this.onSelectCallBack, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_REVENGE), this.onSelectCallBack, this);
    	App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_KILL), this.onSelectCallBack, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_CHOOSE), this.onSelectCallBack, this);
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ATKRACE,this.onUpdateModel,this);

        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESET_ATKRACE, this.battleCallback,this);

        this.refreshNumsView();
    }

    private doGuide() {
        this.onChallengeTap();
    }

    private onUpdateModel() {
        this.initCardListInfo();
        this.refreshCards();
        this.refreshSelectIcon();
        this.refreshNumsView();
    }

    /**
     * 更新挑战次数与消耗相关视图
     */
    private refreshNumsView() {
        let __info = Api.atkraceVoApi.getMyInfo();
        this.freeMax = 0;
        this.freeNum = 0;
        if (this.fightType == AtkraceFightTypes.choose) {
            this.freeMax = Config.AtkraceCfg.getDailyNum();
            this.freeNum = this.freeMax - __info.num;
        }

        let __cgName = this.freeNum > 0 ? "atkrace_addtext5" : "atkrace_addtext4";
        this.challengeBtn.setText(__cgName);

        if (this.freeMax > 0 && this.freeNum > 0) {
            this.challengeNum.text = `${this.freeNum}/${this.freeMax}`;
            this.challengeIcon.visible = false;
            this.challengeNum.width = 130;
            this.challengeNum.x = 480;
            this.challengeNum.setColor(TextFieldConst.COLOR_WARN_GREEN);
        } else {
            this.challengeNum.text = "1/" + Api.itemVoApi.getItemNumInfoVoById(this.costId);
            this.challengeIcon.visible = true;
            this.challengeNum.width = 130 - 47;
            this.challengeNum.x = 480 + 47;
            if (Api.itemVoApi.getItemNumInfoVoById(this.costId) > 0) {
                this.challengeNum.setColor(TextFieldConst.COLOR_WARN_GREEN);
            } else {
                this.challengeNum.setColor(TextFieldConst.COLOR_WARN_RED);
            }
        }
    }

    private initCardListInfo() {
        this._cardData = [];
        this._selectList = [];
        let _servants = <{[index: string]: ServantInfoVo}>Api.servantVoApi.getServantInfoList();
        for (let sid in _servants) {
            if (_servants[sid].level >= Config.AtkraceCfg.getServantLv()) {
                this._cardData.push({
                    servantId: sid,
                    servantInfo: _servants[sid],
                    battle: _servants[sid].AttackNum,
                    HP: _servants[sid].HPNum,
                    isSelect: false,
                    callback: this.onCardTap,
                    callbackObj: this
                })
            }
        }

        // sort key：血量>资质>ID
        this._cardData.sort((a, b) => {
            if (a.HP == b.HP) {
                if (a.servantInfo.getTotalBookValue() == b.servantInfo.getTotalBookValue()) {
                    return parseInt(b.servantId) - parseInt(a.servantId);
                } else {
                    return b.servantInfo.getTotalBookValue() - a.servantInfo.getTotalBookValue();
                }
            } else {
                return b.HP - a.HP;
            }
        })

        let _select: string[] = Api.atkraceVoApi.getMyInfo().combatlist;
        if (_select.length > 0) {
            _select.forEach((v, i) => {
                this._selectList[i] = Api.servantVoApi.getServantObj(_select[i]);
            });

            this._cardData.forEach(v => {
                if (_select.indexOf(v.servantId) >= 0) {
                    v.isSelect = true;
                }
            });

        } else {
            for (let i=0;i<5;i++) {
                this._cardData[i].isSelect = true;
                this._selectList.push(this._cardData[i].servantInfo);
            }
        }
    }

    private refreshCards() {
        for (let i=0;i<this._cardData.length;i++) {
            this._cardData[i].isSelect = this._selectList.filter(v => v && v.servantId == this._cardData[i].servantId).length > 0;
        }
        this._cardList.refreshData(this._cardData);
    }

    private refreshSelectIcon() {
        this._selectList.forEach((v, i) => {
            this._selectIcon[i].refreshView({
                index: i,
                servant: v
            })
        });
    }

    private onCardTap(servant: ServantInfoVo) {
        for (let i=0;i<this._selectList.length;i++) {
            if (this._selectList[i] && this._selectList[i].servantId == servant.servantId) {
                this._selectList[i] = null;
                this.refreshCards();
                this.refreshSelectIcon();
                return;
            }
        }

        let _index = this._selectList.indexOf(null);
        if (_index == -1) {
            App.CommonUtil.showTip(LanguageManager.getlocal("atkrace_addtext19"));
            return;
        }

        this._selectList[_index] = servant;
        this.refreshCards();
        this.refreshSelectIcon();
    }

    private onIconTouch(e: egret.TouchEvent) {
        // console.log(e.target, e.type)
        if (e.target != this.IconBox) return;
        switch (e.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                this.startPos = [e.stageX, e.stageY];
                this.handleIcon = this.getTargetIcon(this.startPos);
                if (this.handleIcon) {
                    this.IconBox.setChildIndex(this.handleIcon, 5);
                }
                this.hasMove = false;
                break;
            case egret.TouchEvent.TOUCH_MOVE:
                if (this.handleIcon) {
                    this.hasMove = true;
                    this.onTouchIconMove(e);
                }
                break;
            case egret.TouchEvent.TOUCH_END:
                if (this.handleIcon) {
                    this.onTouchIconEnd(e);
                    this.hasMove = false;
                    this.handleIcon = null;
                }
                break;
            case egret.TouchEvent.TOUCH_CANCEL:
                if (this.handleIcon) {
                    this.refreshSelectIcon();
                    this.hasMove = false;
                    this.handleIcon = null;
                }
                break;
            default:
                break;
        }
    }

    private onTouchIconMove(e: egret.TouchEvent) {
        let [dx, dy] = [
            e.stageX - this.startPos[0],
            e.stageY - this.startPos[1]
        ]
        this.handleIcon.moveToPos(dx, dy);
    }
    private onTouchIconEnd(e: egret.TouchEvent) {
        if (this.hasMove) {
            let __Icon = this.getTargetIcon([e.stageX, e.stageY]);
            if (__Icon && __Icon.servantId != this.handleIcon.servantId) {
                [this._selectList[__Icon.Index], this._selectList[this.handleIcon.Index]] = [this._selectList[this.handleIcon.Index], this._selectList[__Icon.Index]];
            }
            this.refreshCards();
            this.refreshSelectIcon();
        } else {
            for (let i=0;i<this._selectList.length;i++) {
                if (this._selectList[i] && this._selectList[i].servantId == this.handleIcon.servantId) {
                    this._selectList[i] = null;
                    this.refreshCards();
                    this.refreshSelectIcon();
                    break;
                }
            }
        }
    }

    private getTargetIcon(pos: number[]): AtkraceSelectIconItem {
        let rsl: AtkraceSelectIconItem = null;
        let boxp = this.IconBox.localToGlobal();
        let [dx, dy] = [pos[0] - boxp.x, pos[1] - boxp.y];
        if (dy >= 0 && dy <= 82 && dx >= 0 && dx <= 438 && dx%89 <= 82) {
            let i = Math.floor(dx / 89);
            rsl = this._selectIcon[i] && !this._selectIcon[i].isEmpty ? this._selectIcon[i] : null;
        }
        // for (let i=0;i<this._selectIcon.length;i++) {
        //     if (this._selectIcon[i].isEmpty) continue;
        //     let glp = this._selectIcon[i].localToGlobal();
        //     let [dx, dy] = [pos[0]-glp.x, pos[1]-glp.y];
        //     if (dx >= 0 && dy >= 0 && dx <= 82 && dy <= 82) {
        //         rsl = this._selectIcon[i];
        //         break;
        //     }
        // }
        return rsl;
    }

    /**
     * 出击
     */
    private onChallengeTap() {
        Api.rookieVoApi.checkNextStep();
        // let param: AtkraceSettleInfo = {
        //     type: 2,
        //     fightnum: 10,
        //     name: "lalala",
        //     score: 100,
        //     uid: 1000010,
        //     uname2: "hehehe",
        //     score2: 100,
        //     getReward: "1_1001_10|1_1002_10"
        // }
        // ViewController.getInstance().openView(ViewConst.POPUP.ATKRACESETTLEPOPUPVIEW, param)
        if (this._selectList.filter(v => v==null).length > 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("atkrace_addtext16"));
            return;
        }

        // 免费
        if (this.freeMax > 0 && this.freeNum > 0) {
            this.gotoFight();
            return;
        }

        let _item_name = Config.ItemCfg.getItemCfgById(this.costId).name;
        let _item_num = Api.itemVoApi.getItemNumInfoVoById(this.costId);
        let _tip = LanguageManager.getlocal("atkrace_addtext17", ["1", _item_name]);
        ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, {
            confirmCallback: this.onConfirmCallBack,
            handler: this,
            icon: "itemicon" + this.costId,
            iconBg: "itembg_1",
            num: _item_num,
            msg: _tip,
            id : this.costId,
            useNum:1
        });
    }

    private onConfirmCallBack() {
        let _item = Api.itemVoApi.getItemInfoVoById(this.costId);
        if (this.fightType == AtkraceFightTypes.choose) {
            const _limit = Math.floor(this._cardData.length / Config.AtkraceCfg.getParameter1());
            if (_limit <= Api.atkraceVoApi.getMyInfo().extranum) {
                App.CommonUtil.showTip(LanguageManager.getlocal("atkrace_extro_no_times"));
                return;
            }
        }
        if (_item.num > 0) {
            this.gotoFight();
        } else {
            App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
        }
    }

    private gotoFight() {
        let req: string = "";
        let param: {fuid?: string | number, servantList: string[], isExtra?: number} = {
            servantList: this._selectList.map(v => v.servantId)
        };

        switch(this.fightType) {
            case AtkraceFightTypes.choose:
                req = NetRequestConst.REQUEST_ATKRACE_CHOOSE;
                // 参数 isExtra 是否为购买额外出战标记(0-不是,1-是;默认为0)
                param.isExtra = this.freeMax > 0 && this.freeNum > 0 ? 0 : 1;
                // param.fuid = this.fightUid;
                break;
            case AtkraceFightTypes.revenge:
                req = NetRequestConst.REQUEST_ATKRACE_REVENGE;
                param.fuid = this.fightUid;
                break;
            case AtkraceFightTypes.kill:
                req = NetRequestConst.REQUEST_ATKRACE_KILL;
                param.fuid = this.fightUid;
                break;
            case AtkraceFightTypes.challenge:
                req = NetRequestConst.REQUEST_ATKRACE_CHALLENGE;
                param.fuid = this.fightUid;
                break;
            default:
                return;
        }

        NetManager.request(req, param);
    }

    private onSelectCallBack(e: egret.Event) {
        // console.log(e)
        if (e.data.ret) {
            // todo 去战斗
            // NetManager.request(NetRequestConst.REQUEST_ATKRACE_FIGHT, {});
            ViewController.getInstance().hideView(ViewConst.COMMON.ATKRACEVISITVIEW);
            ViewController.getInstance().hideView(ViewConst.COMMON.ATKRACEVIEW);
            Api.atkraceVoApi.checkAndStartBattle();
            this.hide();
        } else {
            // todo 错误，随便给个提示
        }
    }

    protected getTitleStr(): string {
        return "atkrace_addtext1";
    }

    protected getBorderName():string {
		return "commonview_border1";
	}

    protected getBgName():string {
		return "commonview_woodbg";
	}

    protected getResourceList():string[] {
        return super.getResourceList().concat([
            "commonview_border3",
            "commonview_redtitle"
        ])
    }

    public dispose() {
        this._cardList = null;
        this._cardData = null;
        this._selectList = null;
        this.IconBox = null;
        this._selectIcon = null;
        this.startPos = null;
        this.handleIcon = null;
        this.challengeBtn = null;
        this.challengeIcon = null;
        this.challengeNum = null;

        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT,this.doGuide,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_CHALLENGE), this.onSelectCallBack, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_REVENGE), this.onSelectCallBack, this);
    	App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_KILL), this.onSelectCallBack, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_CHOOSE), this.onSelectCallBack, this);

        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ATKRACE,this.onUpdateModel,this);

        super.dispose();
    }
}

/**
 * 发起战斗类型
 */
enum AtkraceFightTypes {
    /**随机挑战 1 */
    choose = 1,
    /**复仇 2 */
    revenge = 2,
    /**追杀 3 */
    kill = 3,
    /**指定挑战 4 */
    challenge = 4
}

