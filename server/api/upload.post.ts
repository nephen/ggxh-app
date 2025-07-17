import OSS from 'ali-oss';
import { defineEventHandler, readMultipartFormData } from 'h3';

export default defineEventHandler(async (event) => {
    // 检查环境变量是否配置正确
    if (!process.env.OSS_REGION || !process.env.OSS_ACCESS_KEY_ID || !process.env.OSS_ACCESS_KEY_SECRET || !process.env.OSS_BUCKET) {
        console.error('缺少OSS配置，请检查环境变量');
        return {
            success: false,
            message: '缺少OSS配置'
        };
    }
    
    console.log('当前环境变量:');
    console.log('OSS_REGION:', process.env.OSS_REGION);
    console.log('OSS_ACCESS_KEY_ID:', process.env.OSS_ACCESS_KEY_ID);
    console.log('OSS_ACCESS_KEY_SECRET:', process.env.OSS_ACCESS_KEY_SECRET);
    console.log('OSS_BUCKET:', process.env.OSS_BUCKET);

    // 1. 初始化OSS客户端
    const client = new OSS({
        region: process.env.OSS_REGION || '',
        accessKeyId: process.env.OSS_ACCESS_KEY_ID || '',
        accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET || '',
        bucket: process.env.OSS_BUCKET || ''
    });

    // 2. 读取上传的文件
    const files = await readMultipartFormData(event);
    const file = files?.[0];

    if (!file) {
        return {
            success: false,
            message: '未接收到文件'
        };
    }

    try {
        // 3. 上传到OSS
        const result = await client.put(
            `code/${Date.now()}_${file.filename}`,
            Buffer.from(file.data),
            {
                headers: {
                    'x-oss-storage-class': 'Standard',
                    'x-oss-object-acl': 'public-read'
                }
            }
        );

        // 4. 返回成功响应
        return {
            success: true,
            data: {
                url: result.url
            }
        };
    } catch (error) {
        console.error('上传到OSS失败:', error);
        return {
            success: false,
            message: '文件上传失败'
        };
    }
});