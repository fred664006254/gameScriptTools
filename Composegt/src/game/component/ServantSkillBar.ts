/**
 * 门客技能条
 */
class ServantSkillBar extends BaseDisplayObjectContainer {
    public constructor(servantId: string, iconSize: number = 72, showDetail: boolean = true, showType: boolean = false, showName: boolean = false) {
        super();
        this.servantId = servantId;
        this.iconSize = iconSize;
        this.showDetail = showDetail;
        this.showType = showType;
        this.showName = showName;
        // this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initView, this);
        this.initView();
    }

    private servantId: string;
    private iconSize: number;
    private showDetail: boolean;
    private iconSpace: number = 8;
    private showType: boolean;
    private showName: boolean;

    private setLabelWidth: number = 0;

    private skillData: ServantSkillBarParams[] = [];
    // private onShowSkill: ServantSkillBarParams = null;

    private _iconList: ServantSkillIcon[] = [];

    private _callBack: (skillInfo: ServantSkillBarParams)=>void;
    private _callBackObj: any;

    private initView() {

		// let arr = Config.ServantskillCfg.getSpecialSkill(this.servantId);
		// for (let i=0;i<arr.length;i++) {
		// 	let _skill = Config.ServantskillCfg.getSpecialSkillItemCfg(arr[i]);

		// 	this.skillData.push({
		// 		skillid: arr[i],
        //         icon: Config.ServantskillCfg.getSkillIconKeyById(arr[i]),
        //         skillname: Config.ServantskillCfg.getSkillNameById(arr[i]),
		// 		des: _skill.getDescStr()
		// 	});
		// }

        // this.skillData.push({
        //     skillid: "9999",
        //     icon: "servant_skill_icon1",
        //     skillname: "种蘑菇",
        //     des: "蘑菇蘑菇蘑菇～"
        // });

        this.initSkillData();
        this.initIcons();
    }

    private initSkillData() {
        this.skillData = [];
        // 特殊技能
        let arrSpec = Config.ServantskillCfg.getSpecialSkill(this.servantId);
		for (let i=0;i<arrSpec.length;i++) {
			let _skill = Config.ServantskillCfg.getSpecialSkillItemCfg(arrSpec[i]);

			this.skillData.push({
				skillid: arrSpec[i],
                icon: Config.ServantskillCfg.getSkillIconKeyById(arrSpec[i]),
                skillname: Config.ServantskillCfg.getSkillNameById(arrSpec[i]),
				des: _skill.getDescStr(),
                type: ServantSkillBarTypes.Special
			});
		}

        // 经营技能
        let levySkill: Config.SkillLevyCfgItem = Config.ServantCfg.getSkillLevyByServantId(this.servantId);
        if (levySkill) {
            this.skillData.push({
                skillid: levySkill.skillId,
                icon: levySkill.skillIconKey,
                skillname: levySkill.skillName,
                des: levySkill.skillDes,
                type: ServantSkillBarTypes.Levy
            })
        }
    }

    private initIcons() {
        this._iconList = [];
        for (let i=0;i<this.skillData.length;i++) {
            let _icon = ComponentManager.getSkillIcon(this.skillData[i], this.showDetail, this.showType, this.showName);
            _icon.Size = this.iconSize;
            this.addChild(_icon);
            this._iconList.push(_icon);
            // _icon.addTouchTap(this.onIconTap, this, [_icon]);
            _icon.setPosition((this.iconSize+this.iconSpace)*i, 0);
            if (this._callBack && this._callBackObj) {
                _icon.setCallBack(this._callBack, this._callBackObj);
            }
        }
    }

    // private onIconTap(e: egret.Event, icon: ServantSkillIcon) {
    //     if (!this.showDetail) return;
    //     if (e.type != egret.TouchEvent.TOUCH_TAP) return;
    //     const _tapId: string = icon.skillId
    //     for (let i=0;i<this.skillData.length;i++) {
    //         if (this.skillData[i].skillid == _tapId) {
    //             this.onShowSkill = this.skillData[i];
    //             break;
    //         }
    //     }


    //     let _layer = this.getLayer();
    //     let _pos = icon.localToGlobal();

    //     ComponentManager.getSkillDetail().showSkill(this.onShowSkill, _layer, _pos, this.iconSize);

    // }

    /**
     * 设置一个宽度，使得图标在宽度内均匀分布
     * （需设置一个大于默认宽度的值）
     */
    public set labelWidth(w: number) {
        let l = this._iconList.length;
        let iw = (this.iconSize+this.iconSpace)*l-this.iconSpace;
        if (w <= iw) {
            return;
        }
        this.width = w;
        this.setLabelWidth = w;
        let _space: number = (w-this.iconSize*l)/(l+1);
        this._iconList.forEach((v, i)=>{
            v.x = _space+(this.iconSize+_space)*i;
        })
    }

    private adaptLabelWidth() {
        if (this.setLabelWidth) {
            let l = this._iconList.length;
            this.width = this.setLabelWidth;
            let _space: number = (this.setLabelWidth-this.iconSize*l)/(l+1);
            this._iconList.forEach((v, i)=>{
                v.x = _space+(this.iconSize+_space)*i;
            })
        }
    }

    /**
     * 自定义点击反馈
     */
    public setCallBack(callBack: (skillInfo: ServantSkillBarParams)=>void, obj: any) {
        this._callBack = callBack;
        this._callBackObj = obj;
        this._iconList.forEach(v => {
            v.dispose();
        })
        this.initIcons();
        this.adaptLabelWidth();
    }

    /**
     * 移除自定义点击
     */
    public removeCallBack() {
        this._callBack = null;
        this._callBackObj = null;
        this._iconList.forEach(v => {
            v.dispose();
        })
        this.initIcons();
        this.adaptLabelWidth();
    }

    /**改变门客 */
    public changeServant(servantId: string) {
        if (this.servantId == servantId) return;
        this.servantId = servantId;
        this.initSkillData();
        this._iconList.forEach(v => {
            v.dispose();
        })
        this.initIcons();
        this.adaptLabelWidth();
        // if (this.setLabelWidth) {
        //     let l = this._iconList.length;
        //     this.width = this.setLabelWidth;
        //     let _space: number = (this.setLabelWidth-this.iconSize*l)/(l+1);
        //     this._iconList.forEach((v, i)=>{
        //         v.x = _space+(this.iconSize+_space)*i;
        //     })
        // }
    }


    /**技能是否为空 */
    public get emptySkill(): boolean {
        return this.skillData.length == 0;
    }

    public dispose() {
        this.setLabelWidth = null;
        this._iconList = null;
        this._callBack = null;
        this._callBackObj = null;
        super.dispose();
    }
}

enum ServantSkillBarTypes {
    /**被动技能 */
    Passive = 1,
    /**经营技能 */
    Levy = 2,
    /**战斗技能 */
    Special = 3,
}

interface ServantSkillBarParams {
    /**技能ID */
    skillid: string,
    /**技能图标 */
    icon: string,
    /**技能名 */
    skillname: string,
    /**技能描述 */
    des: string,
    /**技能类型 */
    type: ServantSkillBarTypes
}
