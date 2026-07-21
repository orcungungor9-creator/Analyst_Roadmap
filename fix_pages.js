const fs = require('fs');
const path = require('path');

const filesInfo = {
    "tools/hadoop/hadoop.html": {
        "prev_link": "../sql/sql.html",
        "prev_text": "&larr; Önceki: SQL",
        "next_link": "../pyspark/pyspark.html",
        "next_text": "Sonraki Araç: PySpark &rarr;",
        "title": "💻 Hadoop (HDFS) Syntax & Kullanım Örneği",
        "badge": "Dağıtık Depolama",
        "pros_title": "Hadoop'un Artıları ve Eksileri",
        "pros": [
            "▪ <strong>Ölçeklenebilirlik:</strong> Ucuz donanımlarla (commodity hardware) petabaytlarca veriye kolayca ölçeklenebilir.",
            "▪ <strong>Hata Toleransı (Fault Tolerance):</strong> Veriyi üç kopyalı sakladığı için donanım arızalarında veri kaybolmaz.",
            "▪ <strong>Açık Kaynak:</strong> Tamamen ücretsiz ve çok geniş bir topluluk desteğine sahiptir."
        ],
        "cons": [
            "▪ <strong>Batch Odaklı:</strong> Gerçek zamanlı (real-time) veri akışı için değil, toplu (batch) veri işleme için uygundur.",
            "▪ <strong>Disk Tabanlı:</strong> Her işlem diskte okuma/yazma gerektirdiği için Spark gibi in-memory motorlara göre yavaştır.",
            "▪ <strong>Karmaşık Yönetim:</strong> Çok sayıda node barındıran cluster'ların bakımı ve konfigürasyonu zordur."
        ]
    },
    "tools/pyspark/pyspark.html": {
        "prev_link": "../hadoop/hadoop.html",
        "prev_text": "&larr; Önceki: Apache Hadoop",
        "next_link": "../matlab/matlab.html",
        "next_text": "Sonraki Araç: MATLAB &rarr;",
        "title": "💻 PySpark Syntax & Kullanım Örneği",
        "badge": "Dağıtık Analitik Motoru",
        "pros_title": "PySpark'ın Artıları ve Eksileri",
        "pros": [
            "▪ <strong>Hız:</strong> In-memory işleme teknolojisi sayesinde Hadoop MapReduce'dan 100 kata kadar daha hızlıdır.",
            "▪ <strong>Çoklu Dil Desteği:</strong> Python, Scala, Java ve R gibi birden fazla dilde kullanılabilir.",
            "▪ <strong>Zengin Kütüphane:</strong> SQL, MLlib (Makine Öğrenmesi) ve GraphX gibi kütüphaneleri bir arada sunar."
        ],
        "cons": [
            "▪ <strong>Yüksek RAM Tüketimi:</strong> Bellek içi işlem yaptığı için çok yüksek miktarda RAM'e ihtiyaç duyar.",
            "▪ <strong>Manuel Optimizasyon:</strong> Performans için Partitioning ve Caching gibi kavramları iyi bilmeyi gerektirir.",
            "▪ <strong>Öğrenme Eğrisi:</strong> Dağıtık programlama paradigmasını kavramak yeni başlayanlar için zaman alabilir."
        ]
    },
    "tools/matlab/matlab.html": {
        "prev_link": "../pyspark/pyspark.html",
        "prev_text": "&larr; Önceki: PySpark",
        "next_link": "../git/git.html",
        "next_text": "Sonraki Araç: Git &rarr;",
        "title": "💻 MATLAB Syntax & Kullanım Örneği",
        "badge": "Matris ve Simülasyon",
        "pros_title": "MATLAB'ın Artıları ve Eksileri",
        "pros": [
            "▪ <strong>Matris Odaklı Tasarım:</strong> Vektör ve matris hesaplamaları için benzersiz, çok hızlı bir yapı sunar.",
            "▪ <strong>Simulink:</strong> Fiziksel, matematiksel veya kontrol sistemlerini blok diyagramlarla görsel olarak simüle edebilir.",
            "▪ <strong>Güvenilirlik:</strong> Ticari olarak test edilmiş ve doğrulanmış endüstri standardı mühendislik kütüphanelerine sahiptir."
        ],
        "cons": [
            "▪ <strong>Lisans Ücreti:</strong> Python veya R'ın aksine, tamamen ticari ve oldukça pahalı bir yazılımdır.",
            "▪ <strong>Açık Kaynak Eksikliği:</strong> Topluluk kaynaklı güncellemeler kapalı olduğu için yeniliklere daha geç adapte olur.",
            "▪ <strong>Web/Mobil Entegrasyonu:</strong> Yapay zeka veya veri bilimi modellerini web ortamına aktarmak oldukça zordur."
        ]
    },
    "tools/git/git.html": {
        "prev_link": "../matlab/matlab.html",
        "prev_text": "&larr; Önceki: MATLAB",
        "next_link": "../excel/excel.html",
        "next_text": "Sonraki Araç: Excel &rarr;",
        "title": "💻 Git Syntax & Kullanım Örneği",
        "badge": "Versiyon Kontrol",
        "pros_title": "Git'in Artıları ve Eksileri",
        "pros": [
            "▪ <strong>Zaman Makinesi:</strong> Hatalı bir kod yazdığınızda, istediğiniz eski bir kopyaya saniyeler içinde dönebilirsiniz.",
            "▪ <strong>Dağıtık Çalışma:</strong> İnternet olmadan (offline) commit yapabilme ve tam bir repo kopyasını lokalde tutma imkanı sağlar.",
            "▪ <strong>Takım İşbirliği:</strong> Branch (dal) yapısı sayesinde projenin ana kodunu bozmadan aynı anda onlarca kişinin kod yazmasını kolaylaştırır."
        ],
        "cons": [
            "▪ <strong>Karmaşık Öğrenme Eğrisi:</strong> Merge conflict, rebase ve reset gibi kavramları anlamak acemiler için korkutucu olabilir.",
            "▪ <strong>Büyük Veri Yönetimi:</strong> GB'larca büyüklükteki veri setleri veya görseller için tasarlanmamıştır (Git LFS gerektirir).",
            "▪ <strong>Komut Satırı Bağlılığı:</strong> Arayüzleri olsa da tam güç için terminal komutlarına aşina olmayı gerektirir."
        ]
    }
};

for (const [filepath, info] of Object.entries(filesInfo)) {
    const fullPath = path.join(__dirname, filepath);
    let content = fs.readFileSync(fullPath, 'utf8');

    const extractSplit = (str) => {
        return str.split('<strong>')[1].split('</strong>')[0];
    }
    const extractRest = (str) => {
        return str.split('</strong>')[1];
    }

    const prosConsSection = `
        <!-- DETAYLI İNCELEME BÖLÜMÜ -->
        <div class="glass" style="padding: 48px; border-radius: 28px; border: 1px solid var(--glass-border); margin-bottom: 48px;">
            <h2 style="font-size: 2rem; color: var(--text-main); margin-bottom: 28px; border-bottom: 2px solid rgba(255,255,255,0.1); padding-bottom: 16px;">
                ${info.pros_title}
            </h2>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 32px;">
                <!-- Artıları -->
                <div style="background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.2); padding: 32px; border-radius: 20px;">
                    <h3 style="color: var(--neon-green); font-size: 1.5rem; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                        <span>✅</span> Avantajları
                    </h3>
                    <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 14px; color: var(--text-muted);">
                        <li style="display: flex; align-items: flex-start; gap: 10px;">
                            <span style="color: var(--neon-green);">▪</span> <strong>${extractSplit(info.pros[0])}</strong> ${extractRest(info.pros[0])}
                        </li>
                        <li style="display: flex; align-items: flex-start; gap: 10px;">
                            <span style="color: var(--neon-green);">▪</span> <strong>${extractSplit(info.pros[1])}</strong> ${extractRest(info.pros[1])}
                        </li>
                        <li style="display: flex; align-items: flex-start; gap: 10px;">
                            <span style="color: var(--neon-green);">▪</span> <strong>${extractSplit(info.pros[2])}</strong> ${extractRest(info.pros[2])}
                        </li>
                    </ul>
                </div>

                <!-- Eksileri -->
                <div style="background: rgba(244, 63, 94, 0.05); border: 1px solid rgba(244, 63, 94, 0.2); padding: 32px; border-radius: 20px;">
                    <h3 style="color: #f43f5e; font-size: 1.5rem; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                        <span>⚠️</span> Dikkat Edilmesi Gerekenler
                    </h3>
                    <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 14px; color: var(--text-muted);">
                        <li style="display: flex; align-items: flex-start; gap: 10px;">
                            <span style="color: #f43f5e;">▪</span> <strong>${extractSplit(info.cons[0])}</strong> ${extractRest(info.cons[0])}
                        </li>
                        <li style="display: flex; align-items: flex-start; gap: 10px;">
                            <span style="color: #f43f5e;">▪</span> <strong>${extractSplit(info.cons[1])}</strong> ${extractRest(info.cons[1])}
                        </li>
                        <li style="display: flex; align-items: flex-start; gap: 10px;">
                            <span style="color: #f43f5e;">▪</span> <strong>${extractSplit(info.cons[2])}</strong> ${extractRest(info.cons[2])}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
`;

    const divider = content.includes('<!-- KOD ÖRNEĞİ -->') ? '<!-- KOD ÖRNEĞİ -->' : '<!-- HDFS KOD ÖRNEĞİ -->';
    const parts = content.split(divider);
    
    if (parts.length === 2) {
        const topPart = parts[0];
        const bottomPart = parts[1];
        
        const pMatch = bottomPart.match(/<p style="color: var\(--text-muted\); line-height: 1\.6; margin-bottom: 20px;">(.*?)<\/p>/s);
        const pText = pMatch ? pMatch[1].trim() : "Aşağıdaki örnek kullanımı inceleyebilirsiniz.";
        
        const preMatch = bottomPart.match(/<pre.*?>(.*?)<\/pre>/s);
        const preContent = preMatch ? preMatch[1].trim() : "";

        const newSyntaxSection = `
        <!-- SYNTAX / KOD ÖRNEĞİ -->
        <div class="glass" style="padding: 48px; border-radius: 28px; border: 1px solid var(--glass-border); margin-bottom: 48px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
                <h2 style="font-size: 2rem; color: var(--text-main); margin: 0;">${info.title}</h2>
                <span class="badge-pill" style="background: rgba(255, 212, 59, 0.1); color: #FFD43B; border-color: #FFD43B;">${info.badge}</span>
            </div>
            <p style="color: var(--text-muted); margin-bottom: 24px; font-size: 1.1rem;">
                ${pText}
            </p>

            <div style="background: #0d1117; border: 1px solid #30363d; border-radius: 16px; padding: 24px; overflow-x: auto; font-family: 'Fira Code', monospace; font-size: 1rem; line-height: 1.7; color: #e6edf3;">
<pre style="margin: 0;"><code>${preContent}</code></pre>
            </div>
        </div>
`;

        const navButtons = `
        <!-- ALT YÖNLENDİRME BUTONLARI -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px;">
            <button class="btn-hero btn-hero-courses" onclick="window.location.href='${info.prev_link}'">
                ${info.prev_text}
            </button>
            <button class="btn-hero btn-hero-formulas" onclick="window.location.href='${info.next_link}'">
                ${info.next_text}
            </button>
        </div>

    </main>
`;
        
        const endOfFile = bottomPart.split('</main>')[1];
        const finalContent = topPart + prosConsSection + newSyntaxSection + navButtons + endOfFile;
        
        fs.writeFileSync(fullPath, finalContent, 'utf8');
        console.log("Updated", filepath);
    }
}
