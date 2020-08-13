/**
 * 演武场api
 * author yanyuling
 * date 2017/11/28
 * @class StudyatkVoApi
 */
class StudyatkVoApi extends BaseVoApi
{
	private studyatkVo:StudyatkVo;
	public constructor() 
	{
		super();
	}

    public getStudyAtkList()
    {
        return this.studyatkVo.atkList;
    }

    public getStudyAtkInfoByIdx(idx:number)
    {
        return this.studyatkVo.atkList[idx];
    }
    public getStudySkillInfoTotalExp()
    {
        return this.studyatkVo.skillinfo.total;
    }
    public getStudySkillInfoLv()
    {
        return this.studyatkVo.skillinfo.level;
    }

    public getStudyatkFinishinfo()
    {
        return this.studyatkVo.finishinfo;
    }

    public getStudyatkFinishRet()
    {
        return this.studyatkVo.finishinfo.ret;
    }

    public getJoinId()
    {
        return this.studyatkVo.join_uid;
    }

    public getNextPkTime(uname:string)
    {
        let atkinfo = this.studyatkVo.atkinfo
        for (var key in atkinfo) {
            if(atkinfo[key].dtype == 3)
            {              
                let time = atkinfo[key].st + GameConfig.config.studyatkbaseCfg.interval;
                if(atkinfo[key].name1 == Api.playerVoApi.getPlayerName() && atkinfo[key].name2 && time >= GameData.serverTime)
                {
                    return time;
                }
            }
        }
        return 0;
    }
    /**
     * 是否可加入练武
     */
    public getNextJoinTime()
    {
        let atkinfo = this.studyatkVo.atkinfo
        for (var key in atkinfo) {
            if(atkinfo[key].dtype == 3)
            {
                let time = atkinfo[key].st + GameConfig.config.studyatkbaseCfg.interval;
                if(atkinfo[key].name2 == Api.playerVoApi.getPlayerName() && time >= GameData.serverTime)
                {
                    return time;
                }
            }
        }
        return 0;
    }

    public isShowNpc():boolean
	{
		let boo:boolean =false;
		if(Api.composemapVoApi.getMaxLv()>=GameConfig.config.studyatkbaseCfg.needLv)
		{
			boo=true;
		}
		else
		{
			boo=false;
		}
		return  boo
	}

	public getLockedString():string
	{
		return LanguageManager.getlocal("composeUnlockFuncDesc",[GameConfig.config.studyatkbaseCfg.needLv+""]);
	}

    public openMainView()
    {
        let studyAtkBaseCfg = GameConfig.config.studyatkbaseCfg
        let tmpFuid = Api.playerVoApi.getPlayerID();
        let endSec = this.studyatkVo.create_time + studyAtkBaseCfg.lastTime;
        if(this.studyatkVo.join_uid > 0)
        {
            endSec = this.studyatkVo.join_st + studyAtkBaseCfg.lastTime;
            tmpFuid = this.studyatkVo.join_uid;
        }
        if(endSec > GameData.serverTime)
        {
            ViewController.getInstance().openView(ViewConst.COMMON.STUDYATKDETAILVIEW,{uid:tmpFuid});
        }else
        {
            ViewController.getInstance().openView(ViewConst.COMMON.STUDYATKVIEW);
        }
    }

    public checkNpcMessage():boolean
    {
        let totalExp = this.getStudySkillInfoTotalExp();
		let cfgData = Config.StudyatkCfg.getStudyatkCfgById(Math.min(Config.StudyatkCfg.getMaxLevel(),Number(this.getStudySkillInfoLv())+1));
		if(totalExp<cfgData.needExp)
		{
			return false;
		}
        return true;
    }

    public getNextEnterTime()
    {
        let interval = GameConfig.config.studyatkbaseCfg.interval;
        return this.studyatkVo.goout_time + interval;
    }
}