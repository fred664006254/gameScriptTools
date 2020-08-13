class LadderTournamentReportVoApi extends BaseVoApi
{

    public reportData:any[] = [];
    public score:number = 0;
    public isAttack:boolean = false;

    public constructor() {
		super();
	}

    public formatData1(data:any,score:number[]):void
	{
		if (data)
        {   
            this.reportData.length = 0;
            if (data[0][4].uid == Api.playerVoApi.getPlayerID())
            {   
                let reportData = [];
                for (let i:number = 0; i<data.length ; i++)
                {   
                    reportData[i]= [];
                    reportData[i][0] = data[i][0] == 1 ? 2 : 1;
                    reportData[i][1] = data[i][1] == 1 ? 2 : 1;
                    reportData[i][2] = data[i][2];
                    reportData[i][3] = data[i][4];
                    reportData[i][4] = data[i][3];
                }
                this.reportData = reportData;
                this.score = score[1];
                this.isAttack = false;
            }
            else
            {
                this.reportData = data;
                this.score = score[0];
                this.isAttack = true;
            }
        }
    }

    /**
     * 获取index
     * @param t第几场
     * @param r第几回合
     */
    private getIndexByTypeAndRound(t:number,r:number):number
    {
        let index:number = t==1? 0 : (t-2)*5+r;
        return index;
    }
    /**
     * 单轮双方总血量
     * @param type
     */
    public getBattleBloodByRound(t:number,r:number):number[] 
    {   
        let index = this.getIndexByTypeAndRound(t,r);
        let playerData = this.reportData[index];
        let info:number[] = [playerData[3].fullattr,playerData[4].fullattr];
        for (let i:number = 0; i<2; i++)
        {
            if (info[i]== null)
            {
                info[i]=0;
            }
        }
        return info;
    }

    /**
     * 先手 1 or 2
     */
    public getFirstHandByRound(t:number, r:number):number 
    {   
        let index = this.getIndexByTypeAndRound(t,r);
        return this.reportData[index][0];
    }

    /**
     * 参赛者信息  
     */
    public getCompetitorInfo(t:number,r:number):any[] 
    {   
        let index = this.getIndexByTypeAndRound(t,r);
        let info:any[] = [];
        info.push(this.reportData[index][3]);
        info.push(this.reportData[index][4]);
        return info;
    }

    /**
     * 单回合战斗信息 
     * @param pos 1 or 2
     */
    public getReportByRoundAndIndex(t:number,r:number,idx:number):number[] 
    {       
        let index = this.getIndexByTypeAndRound(t,r);
        let info:number[] = [];
        let isCrit:number = 0;
        let damage:number = 0;
        let damageTab:number[] = this.reportData[index][2][idx-1];
        if (damageTab)
        {
            isCrit = damageTab[0];
            damage = damageTab[1];
        }
        info.push(isCrit);
        info.push(damage);
        return info;
    }

    /**
     * 单场5轮门客信息
     * @param pos 1 or 2
     */
    public getServantInfo(t:number,pos:number):any[]
    {
        let index = this.getIndexByTypeAndRound(t,1);
        let info = [];
        for (let i:number = index; i<(index+5); i++)
        {
            if (pos == 1)
            {
                info.push(this.reportData[i][3]);
            }
            else
            {
                info.push(this.reportData[i][4]);
            }
        }
        return info;
    }

    /**
     * 战斗结果  1 or 2
     */
    public getBattleResultByRound(t:number,r:number):number 
    {   
        let index = this.getIndexByTypeAndRound(t,r);
        if (!this.reportData[index])
        {
            return 1;
        }
        return this.reportData[index][1];
    }

    /**
     *  一场战斗结果比分
     */
    public getBattleResultByType(t:number):number[]
    {   
        let index = this.getIndexByTypeAndRound(t,1);
        let score = [0,0];
        let endIdx:number = index+5;
        if (t == 1)
        {
            endIdx = index+1;
        }
        for (let i = index; i< endIdx; i++)
        {
            if (this.reportData[i][1] == 1)
            {
                score[0]++;
            }
            else
            {
                score[1]++;
            }
        }
        return score;
    }
    /**
     *  一场战斗胜负结果
     */
    public getBattleWinByType(t:number):boolean
    {   
        let index = this.getIndexByTypeAndRound(t,1);
        let score = [0,0];
        let endIdx:number = index+5;
        if (t == 1)
        {
            endIdx = index+1;
        }
        for (let i = index; i< endIdx; i++)
        {
            if (this.reportData[i][1] == 1)
            {
                score[0]++;
            }
            else
            {
                score[1]++;
            }
        }
        return score[0]>score[1];
    }

    /**
     *  整场战斗结果比分
     */
    public getAllBattleResult():number[]
    {   
        let score = [0,0];
        for (let i = 1; i<=5; i++)
        {
            if (this.getBattleWinByType(i))
            {
                score[0]++;
            }
            else
            {
                score[1]++;
            }
        }
        return score;
    }

    public dispose():void
	{	
        this.reportData.length = 0;
        this.score = 0;
        this.isAttack = null;
		
		super.dispose();
	}
}