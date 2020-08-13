class AcCrossOneServerVo extends AcBaseVo {
    public constructor() {
        super();
    }

    private info: any = {};
    private task: any = {};
    private zidgroup: number[] = [];

    public initData(data: any) {
        for (let key in data) {
			this[key] = data[key];
		}
        // this.zidgroup = [11,12,13,17, 19,20, 31,33,34,35,41]
    }

    public get config(): Config.AcCfg.CrossOneServerCfg {
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    /**
     * 获取当期门客立绘
     */
    public get CurrServantImg(): string {
        return "servant_full_" + this.config.servant;
    }
    /**
     * 获取当期门客龙骨
     */
    public get CurrServantDragon(): string {
        return `servant_full2_${this.config.servant}`;
    }

    /**
     * 获取当期门客信息
     */
    public get CurrServantInfo(): Config.ServantItemCfg {
        return Config.ServantCfg.getServantItemById(this.config.servant)
    }

    public getServerGroup(): string {
        let _gp = this.zidgroup.map(v => {
            return Api.mergeServerVoApi.getSeverName(v);//LanguageManager.getlocal("acCrossOneServerText20", [`${v}`]);
        })

        return LanguageManager.getlocal("acCrossOneServerText28", [_gp.join("、")]);
    }

    public getServerGroupText(): string {
         //原来是显示x服，改成x区。
        // let _zid_gp: number[][] = [];
        // let _dd: number[] = [this.zidgroup[0]];
        // for (let i=1;i<this.zidgroup.length;i++) {
        //     if (this.zidgroup[i] == this.zidgroup[i-1]+1) {
        //         _dd.push(this.zidgroup[i]);
        //     } else {
        //         _zid_gp.push([_dd[0], _dd[_dd.length - 1]]);
        //         _dd = [this.zidgroup[i]];
        //     }
        // }
        // if (_dd.length) {
        //     _zid_gp.push([_dd[0], _dd[_dd.length - 1]]);
        // }

        // let __param = _zid_gp.slice(0, 5).map(v => {
        //     let _pm = v[0] == v[1] ? `${v[0]}` : `${v[0]}-${v[1]}`;
        //     return LanguageManager.getlocal("acCrossOneServerText20", [_pm]);
        // }).join("、");

        let _zid_gp: number[][] = [];

        let server = "";
        let tmepGroup:number[] = [];
        if(Api.mergeServerVoApi.getQuByZid(this.zidgroup[0]) > 0){
             for (let i=0;i<this.zidgroup.length;i++) {
                 let zid = Api.mergeServerVoApi.getQuByZid(this.zidgroup[i]);
                 if (!GameData.isInArray(zid,tmepGroup))
                 {
                     tmepGroup.push(zid);
                 }
                 
             }
             server ="mergeServerOnlyqu";
        } else {
            server = "acCrossOneServerText20";
            tmepGroup = this.zidgroup;
        }

        let _dd: number[] = [tmepGroup[0]];
        for (let i=1;i<tmepGroup.length;i++) {
            if (tmepGroup[i] == tmepGroup[i-1]+1) {
                _dd.push(tmepGroup[i]);
            } else {
                _zid_gp.push([_dd[0], _dd[_dd.length - 1]]);
                _dd = [tmepGroup[i]];
            }
        }
        if (_dd.length) {
            _zid_gp.push([_dd[0], _dd[_dd.length - 1]]);
        }

        let __param = _zid_gp.slice(0, 5).map(v => {
            let _pm = v[0] == v[1] ? `${v[0]}` : `${v[0]}-${v[1]}`;
            return LanguageManager.getlocal(server, [_pm]);
        }).join("、");

        return LanguageManager.getlocal(_zid_gp.length > 5 ? "acCrossOneServerText25":"acCrossOneServerText26", [__param]);
        


    }

    public get MsgText(): string {
        let params: string[] = [
            this.CurrServantInfo.name,
            this.CurrServantInfo.name,
            this.config.needLv + "",
            this.acTimeAndHour
        ]
        return LanguageManager.getlocal("acCrossOneServerText1", params)
    }

    public get risePower(): number {
        return this.info.v || 0;
    }

    public getTaskStatus(rkey: number): number {
        if (this.task.flags[rkey]) {
            return 1;
        }

        let _ti = this.config.taskList[rkey - 1];
        return _ti.powerAdd <= this.risePower ? 3 : 2;
    }

    public TaskHasRewGet(): boolean {
        let rsl = false;
        for (let i=0;i<this.config.taskList.length;i++) {
            if (this.getTaskStatus(i+1) == 3) {
                rsl = true;
                break;
            }
        }

        return rsl;
    }

    /**
	 * 检测活动是否显示红点，true：显示
	 */
	public get isShowRedDot(): boolean {
        return this.TaskHasRewGet();
	}

    public getRankInfo(index: number) {
        NetManager.request(NetRequestConst.REQUEST_ACCROSSONESERVER_GETRANK, {
            "activeId": `${this.aid}-${this.code}`,
            "index": index
        });
    }

    public dispose() {
        super.dispose();
    }
}