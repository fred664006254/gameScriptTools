class LaddertournamentVo extends BaseVo
{   
    /**
	 * 战斗记录
	 */
    public logs:any[] = [];
    /**
	 * 当前第几轮
	 */
    public nowturn:number = 0;
    /**
	 * 对手
	 */
    public competitor:Object = {};
    /**
	 * 当天0点
	 */
    public lastday:number = 0;
    /**
	 * 活动开始时间
	 */
    public version:number = 0;
    /**
	 * "fightNum" 战斗次数
	 */
    public info:any = {};
    /**
	 * 军功
	 */
    public shopscore:number = 0;
    /**
	 * 排行榜分数
	 */
    public point:number = 0;
    /**
	 * 门客队伍
	 */
    public team:Object[] = [];
    /**
	 * 刷新
     * @param num
     * @param lasttime
	 */
    public refresh:any = {};

    public rankArr:Object[] = [];
    public myrankArr:Object = {};

    public preRankArr:Object[] = [];
    public preMyrankArr:Object = {};

    public constructor() {
		super();
	}

	public initData(data:any):void
	{
        if (data) {
            if (data.logs != null)
            {
                
                this.setLogs(data.logs);
                
            }
            if (data.nowturn != null)
            {
                this.nowturn = data.nowturn;
            }
            if (data.competitor != null)
            {
                this.competitor = data.competitor;
            }
            if (data.lastday != null)
            {
                this.lastday = data.lastday;
            }
            if (data.version != null)
            {
                this.version = data.version;
            }
            if (data.info != null)
            {
                this.info = data.info;
            }
            if (data.shopscore != null)
            {
                this.shopscore = data.shopscore;
            }
            if (data.point != null)
            {
                this.point = data.point;
            }
            if (data.team != null)
            {
                this.team = data.team;
            }
            if (data.refresh != null)
            {
                this.refresh = data.refresh;
            }
            if (data.rankArr != null)
            {
                this.rankArr = data.rankArr;
            }
            if (data.myrankArr != null)
            {
                this.myrankArr = data.myrankArr;
            }
        }
    }


    public setLogs(data:any[]):void
    {
        this.logs.length = 0;
        for (let k=0 ; k<data.length; k++)
        {
            let oneData = data[k];
            this.logs.push(oneData);
            let pkData = oneData.pklogs;
            if (pkData[0][4].uid == Api.playerVoApi.getPlayerID())
            {   
                let reportData = [];
                for (let i:number = 0; i<pkData.length ; i++)
                {   
                    reportData[i]= [];
                    reportData[i][0] = pkData[i][0] == 1 ? 2 : 1;
                    reportData[i][1] = pkData[i][1] == 1 ? 2 : 1;
                    reportData[i][2] = pkData[i][2];
                    reportData[i][3] = pkData[i][4];
                    reportData[i][4] = pkData[i][3];
                }
                oneData.pklogs = reportData;

                let scoreData = [oneData.getPoint[1],oneData.getPoint[0]];
                oneData.getPoint = scoreData;
            }
        }
    }

    public dispose()
    {
        this.logs.length = 0;
        this.nowturn = 0;
        this.competitor = {};
        this.lastday = 0;
        this.info = {};
        this.shopscore = 0;
        this.point = 0;
        this.team.length = 0;
        this.refresh = {};
        this.rankArr.length = 0;
        this.myrankArr = {};
        this.preRankArr.length = 0;
        this.preMyrankArr = {};
    }
}