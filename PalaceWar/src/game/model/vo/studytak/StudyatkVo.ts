/**
  * 演武场
 * author yanyuling
 * date 2017/11/28
 * @class StudyatkVo
 */
class StudyatkVo extends BaseVo
{
    public atkList = [];
    public skillinfo:any;
    public finishinfo:any;
    public goout_time :number = 0;
    public join_uid :number = 0;
    public skillrate :number = 0;
    public create_time :number = 0;
    public join_st :number = 0;
    public atkinfo:any;
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
        if(data.studyatk)
        {
            if (data.studyatk.atklist)
            {
                let atklist = data.studyatk.atklist
                for (var index = 0; index < atklist.length; index++) {
                    let tableVo:StudyatkTableInfoVo = this.atkList[index];
                    if(tableVo == null)
                    {
                        tableVo = new StudyatkTableInfoVo();
                        this.atkList.push(tableVo);
                    }
                    tableVo.initData(atklist[index]);
                }
            }
            if(data.studyatk.skillinfo != null)
            {
                this.skillinfo = data.studyatk.skillinfo;
            }
            if(data.studyatk.goout_time != null)
            {
                this.goout_time = data.studyatk.goout_time;
            }
            if(data.studyatk.finishinfo != null)
            {
                this.finishinfo = data.studyatk.finishinfo;
            }
            if(data.studyatk.join_uid != null)
            {
                this.join_uid = data.studyatk.join_uid;
            }
            if(data.studyatk.skillrate != null)
            {
                this.skillrate = data.studyatk.skillrate;
            }
            if(data.studyatk.create_time != null)
            {
                this.create_time = data.studyatk.create_time;
            }
            if(data.studyatk.join_st != null)
            {
                this.join_st = data.studyatk.join_st;
            }

            if(data.studyatk.atkinfo != null)
            {
                this.atkinfo = data.studyatk.atkinfo;
            }
        }
    }

    public dispose()
    {
        this.atkList = [];
        this.skillinfo = null;
        this.finishinfo = null;
        this.goout_time = 0;
        this.join_uid = 0;
        this.skillrate = 0;
        this.create_time = 0;
        this.join_st = 0;
        this.atkinfo = null;
    }
}