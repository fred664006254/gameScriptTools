

class EmperorwarReportVoApi extends BaseVoApi
{	

    public reportData:any[] = [];
    private _playerDamageTab:number[] = [];

    public constructor() {
		super();
	}


    public formatData(data:any):void
	{
		if (data)
        {   
            


            if (data[0][4].uid == Api.playerVoApi.getPlayerID() || ( data[0][4].uid != Api.playerVoApi.getPlayerID() && data[0][3].uid != Api.playerVoApi.getPlayerID() && this.getBattleWin2(data) == 2))
            {   
                this.reportData = [[],[],[],[],[]];
                for (let i:number = 0; i<5 ; i++)
                {
                    this.reportData[i][0] = data[i][0] == 1 ? 2 : 1;
                    this.reportData[i][1] = data[i][1] == 1 ? 2 : 1;
                    this.reportData[i][2] = data[i][2];
                    this.reportData[i][3] = data[i][4];
                    this.reportData[i][4] = data[i][3];
                }
            }
            else 
            {
                this.reportData = data;
            }



            let playerData = this.reportData[0];
            let cheerAddAtk:number = Config.EmperorwarCfg.cheerAddAtk;
            let playerDamage1:number = playerData[3].quality * 100 ;
            let playerDamage2:number = playerData[4].quality * 100 ;

            if (playerData[3].cheer > playerData[4].cheer)
            {
                playerDamage1 = playerDamage1*(1+cheerAddAtk);
            }
            else if (playerData[4].cheer > playerData[3].cheer)
            {
                playerDamage2 = playerDamage2*(1+cheerAddAtk);
            }

            this._playerDamageTab = [playerDamage1,playerDamage2];

        }
	}

    /**
     * 先手 1 or 2
     */
    public getFirstHandByRound(r:number):number 
    {
        return this.reportData[r-1][0];
    }

    /**
     * 战斗结果  1 or 2
     */
    public getBattleResultByRound(r:number):number 
    {   
        if (!this.reportData[r-1])
        {
            return 1;
        }
        return this.reportData[r-1][1];
    }

    /**
     * 参赛者信息  
     */
    public getCompetitorInfo(r:number):any[] 
    {   
        let info:any[] = [];
        info.push(this.reportData[r-1][3]);
        info.push(this.reportData[r-1][4]);
        return info;
    }

    /**
     * 单回合战斗信息 
     * @param pos 1 or 2
     */
    public getReportByRoundAndIndex(r:number,idx:number,pos?:number):number[] 
    {   
        let info:number[] = [];
        let isCrit:number = 0;
        let damage:number = 0;
        if (r == 1)
        {   
            let damageTab:number[] = this.reportData[r-1][2][idx-1];
            if (damageTab)
            {
                isCrit = damageTab[0];
                damage = damageTab[1];
            }
            else
            {   
                isCrit = 0;
                damage = this._playerDamageTab[pos-1];
            }
        }
        else
        {   
            let damageTab:number[] = this.reportData[r-1][2][idx-1];
            if (damageTab)
            {
                isCrit = damageTab[0];
                damage = damageTab[1];
            }
        }
        info.push(isCrit);
        info.push(damage);
        return info;
    }

    /**
     * 单回合战斗信息 
     * @param pos 1 or 2
     */
    public getBattleBloodByRound(r:number):number[] 
    {   
        let playerData = this.reportData[r-1];
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
     * 战斗胜利类型
     * @param pos 1 or 2
     */
    public getBattleWin():number
    {   
        let winTab:number[] = [0,0];
        for (let i =1; i<=5; i++)
        {
            winTab[this.getBattleResultByRound(i)-1]++;
            for (let j=0; j<2; j++)
            {
                if (winTab[j]>=3)
                {
                    return j+1;
                }
            }
        }
        return 1;
    }

    public getBattleWin2(data:any):number
    {   
        let winTab:number[] = [0,0];
        for (let i =1; i<=5; i++)
        {
            winTab[this.getBattleResultByRound2(i,data)-1]++;
            for (let j=0; j<2; j++)
            {
                if (winTab[j]>=3)
                {
                    return j+1;
                }
            }
        }
        return 1;
    }

    public getBattleResultByRound2(r:number,data:any):number 
    {   
        if (!data[r-1])
        {
            return 1;
        }
        return data[r-1][1];
    }

    public getIsMeJoin():boolean
    {
        return this.reportData[0][3].uid == Api.playerVoApi.getPlayerID();
    }

    public dispose():void
	{	
        this.reportData.length = 0;
        this._playerDamageTab.length = 0;
		
		super.dispose();
	}
}