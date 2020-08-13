
class LevyScrollItemDetailBuffItem extends ScrollListItem {
    private _data = null;

    public constructor() {
        super();
    }

    private get buffIndex() {
        return this._index;
    }

    protected initItem(index: number, data: any, itemParam: any) {
        this._data = data;

        this.width = 520;
        this.height = 70;

        //征收条目的index
        let itemIndex = itemParam.itemIndex;
        let buffCfg = Api.levyVoApi.getBuffCfg(itemIndex, this.buffIndex);
        let tarColor = TextFieldConst.COLOR_BROWN_NEW;

        let condBg = BaseBitmap.create("public_ts_bg01");
        condBg.width = 420;
        condBg.setPosition(this.width / 2 - condBg.width / 2, 10);
        this.addChild(condBg);

        let starRes = "levy_star1";
        if (Api.levyVoApi.getBuffIsFull(itemIndex, this.buffIndex)) {
            starRes = "levy_star2";
        } else {
            if (Api.levyVoApi.checkLevyItemIsLaunch(itemIndex)) {
                let btnRes = "";
                switch (buffCfg.condType) {
                    case 1:
                        btnRes = "levy_uplevelbtn";
                        break;
                    case 2:
                        btnRes = "levy_upabilitybtn";
                        break;
                    case 3:
                        btnRes = "levy_getBtn";
                        break;
                    default:
                        break;
                }
                let goBtn = ComponentManager.getButton(btnRes, '', this.goBtnClick, this, [{ itemIndex: itemIndex, condType: buffCfg.condType }]);
                this.addChild(goBtn);
                goBtn.setPosition(condBg.x + condBg.width - 30, condBg.y + condBg.height / 2 - goBtn.height / 2);
            }
        }
        let star = BaseBitmap.create(starRes);
        star.setScale(0.7);
        this.addChild(star);
        star.x = 80;
        star.y = condBg.y;

        let condParam: string[] = [buffCfg.condNum + '']
        if (buffCfg.condType == 3) {
            let __condNum: number[] = <number[]>buffCfg.condNum;
            condParam = [
                LanguageManager.getlocal(`servantQuality_name${__condNum[0]}`),
                __condNum[1]+""
            ]
        }
        let conditonStr = LanguageManager.getlocal(`levy_buffitem_conditon_type${buffCfg.condType}`, condParam) + `(${Api.levyVoApi.getBuffStateStr(itemIndex, this.buffIndex)})`;
        let conditonTxt = ComponentManager.getTextField(conditonStr, 20, tarColor);
        this.addChild(conditonTxt);
        conditonTxt.setPosition(star.x + star.width - 5, star.y + 7);

        for (let i = 0; i < buffCfg.levyBuffID.length; i++) {
            let buffAddNum = 0;
            buffAddNum = Api.levyVoApi.getBuffAddNumById(buffCfg.levyBuffID[i]);
            let buffInfoCfg = Config.LevyCfg.getBuffInfoCfg(buffCfg.levyBuffID[i]);

            let buffDescStr = LanguageManager.getlocal(`levy_buffitem_buffdesc`, [
                LanguageManager.getlocal(`servantInfo_speciality${buffInfoCfg.attType}`),
                `${Math.round(buffInfoCfg.rate * 100)}%`,
                LanguageManager.getlocal(`affair_rewardType${buffInfoCfg.resType}`),
            ]) + `(${LanguageManager.getlocal("levy_buffitem_buffaddnow", [buffAddNum + ""])})`;
            let buffDescTxt = ComponentManager.getTextField(buffDescStr, 18, TextFieldConst.COLOR_QUALITY_ORANGE_NEW);
            this.addChild(buffDescTxt);
            buffDescTxt.setPosition(this.width / 2 - buffDescTxt.width / 2, star.y + star.height + i * (buffDescTxt.height + 10));
            this.height = buffDescTxt.y + buffDescTxt.height + 20;
        }



        let line = BaseBitmap.create("public_line4");
        this.addChild(line);
        line.width = this.width - 10;
        line.x = 8;
        line.y = this.height - line.height;
    }

    private goBtnClick(param: any) {
        if (param.itemIndex && param.condType) {
            let sids = Api.levyVoApi.getLevyItemServantIds(param.itemIndex);
            let servantId = '';
            if (sids && param.condType == 1) {
                let minLevel = 0;
                for (const key in sids) {
                    if (sids.hasOwnProperty(key)) {
                        let serObj: ServantInfoVo = Api.servantVoApi.getServantObj(sids[key]);
                        if (!servantId && !minLevel) {
                            servantId = sids[key];
                            minLevel = serObj.level;
                        }
                        if (serObj.level < minLevel) {
                            servantId = sids[key];
                            minLevel = serObj.level;
                        }

                    }
                }
            } else if (sids && param.condType == 2) {

                let minAb = 0;
                for (const key in sids) {
                    if (sids.hasOwnProperty(key)) {
                        let serObj: ServantInfoVo = Api.servantVoApi.getServantObj(sids[key]);
                        if (!servantId && !minAb) {
                            servantId = sids[key];
                            minAb = serObj.getTotalBookValue();
                        }
                        if (serObj.getTotalBookValue() < minAb) {
                            servantId = sids[key];
                            minAb = serObj.getTotalBookValue();
                        }
                    }

                }
            } else if (param.condType == 3) {
                if (Api.shopVoApi.isCanShowFirstCharge()) {
                    ViewController.getInstance().openView(ViewConst.POPUP.FIRSTRECHARGEVIEW);
                } else {
                    ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEWTAB2);
                }
                return;
            }
            ViewController.getInstance().openView(ViewConst.COMMON.SERVANTINFOVIEW, servantId);

        }
    }

	/**
	 * 不同格子Y间距
	 */
    public getSpaceY(): number {
        return 0;
    }
    public dispose(): void {
        this._data = null;
        super.dispose();
    }
}
