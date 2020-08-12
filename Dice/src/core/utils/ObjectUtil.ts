namespace App
{
	export namespace ObjectUtil
	{
        /**
         * 清理Object对象数据
         * @param params 
         */
        export function clear(params:Object) 
        {
            if(params&&(typeof params) == "object")
            {
                if(params instanceof Array)
                {
                    params.length=0;
                }
                else
                {
                    for (const key in params) 
                    {
                        if (params.hasOwnProperty(key)) 
                        {
                            delete params[key];
                        }
                    }
                }
            }
        }
        
    }
}