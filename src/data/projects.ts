import { Language } from "../locales/translations";

export type ProjectCategory =
  | "Machine Learning/Deep Learning"
  | "Data Analysis & Visualization"
  | "Web App/Deployment";

export type Project = {
  category: ProjectCategory;
  name: string;
  subtitle: string;
  date: string;
  image: string;
  tags: string[];
  solution: string;
  tech: string;
  result: string;
  github: string;
  demo?: string;
};

export const categoryOrder: ProjectCategory[] = [
  "Machine Learning/Deep Learning",
  "Data Analysis & Visualization",
  "Web App/Deployment",
];

export const categoryLabels: Record<ProjectCategory, string> = {
  "Machine Learning/Deep Learning": "AI Engineer",
  "Data Analysis & Visualization": "Data Scientist",
  "Web App/Deployment": "Web Development",
};

export const featuredProjects: Project[] = [
  {
    category: "Web App/Deployment",
    name: "AI-Engineer-Portfolio",
    subtitle: "Personal portfolio website highlighting selected AI and data work",
    date: "Mar 2026",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&fm=webp&q=80&w=1200",
    tags: ["Portfolio", "React", "TypeScript", "GitHub Pages"],
    solution:
      "Xay dung website portfolio ca nhan de tong hop du an AI/Data va tao diem truy cap ro rang cho nha tuyen dung.",
    tech:
      "React, TypeScript, Vite, Tailwind CSS, Motion va workflow GitHub Pages cho deploy static.",
    result:
      "Tao mot portfolio online on dinh, responsive, de cap nhat va dong bo voi cac du an tren GitHub.",
    github: "https://github.com/laninh-tech/AI-Engineer-Portfolio",
    demo: "https://laninh-tech.github.io/AI-Engineer-Portfolio/",
  },
  {
    category: "Data Analysis & Visualization",
    name: "Diabetes Health Risk Analysis",
    subtitle: "Health risk classification on CDC BRFSS indicators",
    date: "Nov 2025",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&fm=webp&q=80&w=1200",
    tags: ["Python", "Pandas", "Scikit-learn", "Classification", "Healthcare"],
    solution:
      "Phân tích dữ liệu CDC BRFSS để nhận diện các yếu tố liên quan đến nguy cơ tiểu đường và xây dựng workflow phân loại cho bài toán health analytics.",
    tech:
      "Theo README: xử lý dữ liệu bằng Python (Pandas, NumPy), mô hình Logistic Regression, Naive Bayes, Decision Tree với Scikit-learn và trực quan hóa bằng Matplotlib/Seaborn.",
    result:
      "Xác định được nhóm biến quan trọng liên quan nguy cơ bệnh và tạo pipeline phân tích có thể tái lập cho mục tiêu học thuật và portfolio data science.",
    github: "https://github.com/laninh-tech/Diabetes-Health-Risk-Analysis",
  },
  {
    category: "Machine Learning/Deep Learning",
    name: "Edge AI Security Monitoring System",
    subtitle: "Real-time computer vision dashboard for edge security monitoring",
    date: "Feb 2026",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&fm=webp&q=80&w=800",
    tags: ["YOLOv8", "OpenCV", "Python", "React", "TypeScript"],
    solution:
      "Giải quyết bài toán giám sát an ninh thời gian thực với object detection trên camera/video stream, kèm dashboard để theo dõi sự kiện và telemetry.",
    tech:
      "Theo README: YOLOv8 + OpenCV cho computer vision, Python service cho backend, React/TypeScript/Vite cho frontend và runtime local multi-service.",
    result:
      "Hoàn thiện một edge AI monitoring prototype hoạt động end-to-end, giúp trình bày rõ khả năng tích hợp model inference với sản phẩm phần mềm.",
    github: "https://github.com/laninh-tech/Edge-AI-Security-Monitoring-System",
  },
  {
    category: "Data Analysis & Visualization",
    name: "Game A/B Testing Analysis",
    subtitle: "Statistical experiment analysis for retention and product impact",
    date: "Oct 2025",
    image:
      "https://images.unsplash.com/photo-1553481187-be93c21490a9?auto=format&fit=crop&fm=webp&q=80&w=1200",
    tags: ["A/B Testing", "Statistics", "R Markdown", "Product Analytics"],
    solution:
      "Phân tích thí nghiệm A/B cho bài toán product analytics, tập trung so sánh control-treatment và diễn giải tác động tới retention/hành vi người dùng.",
    tech:
      "README mô tả workflow gồm data validation, so sánh nhóm thử nghiệm, statistical significance testing và trực quan hóa kết quả để hỗ trợ quyết định sản phẩm.",
    result:
      "Tạo cấu trúc phân tích A/B có thể tái sử dụng cho các thí nghiệm sau, đồng thời chuyển hóa kết quả thống kê thành gợi ý hành động mang tính business.",
    github: "https://github.com/laninh-tech/Game-AB-Testing-Analysis",
  },
  {
    category: "Web App/Deployment",
    name: "Interactive Gift Landing Page",
    subtitle: "Interactive promotional landing page template",
    date: "Dec 2024",
    image:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&fm=webp&q=80&w=1200",
    tags: ["HTML", "CSS", "JavaScript", "Landing Page"],
    solution:
      "Xây dựng landing page tương tác cho campaign theo mùa, hướng tới visual storytelling và khả năng tái sử dụng cho nhiều bối cảnh truyền thông.",
    tech:
      "Theo README: HTML, CSS, JavaScript với lightweight interactive animation patterns, tối ưu cho static hosting và triển khai nhanh.",
    result:
      "Tạo template microsite có thể dùng lại, giúp thể hiện năng lực frontend implementation gọn nhẹ nhưng vẫn có trải nghiệm tương tác rõ ràng.",
    github: "https://github.com/laninh-tech/Interactive-Gift-Landing-Page",
  },
  {
    category: "Machine Learning/Deep Learning",
    name: "Smart Recommendation System",
    subtitle: "End-to-end recommendation platform with analytics dashboard",
    date: "Aug 2025",
    image:
      "https://raw.githubusercontent.com/laninh-tech/Smart-Recommendation-System/master/docs/images/dashboard.jpg",
    tags: ["Python", "React", "TypeScript", "Docker", "MLOps"],
    solution:
      "Giải quyết bài toán recommendation từ huấn luyện đến serving trong cùng một hệ thống, có dashboard để theo dõi hành vi và chất lượng gợi ý.",
    tech:
      "README nêu rõ stack gồm Python cho data pipeline, deep learning ranking models, backend inference service, dashboard React/TypeScript và Docker/Docker Compose cho triển khai.",
    result:
      "Thiết lập được workflow train-to-serve hoàn chỉnh cùng kiến trúc nền cho experiment tracking, model versioning và phân tích chất lượng recommendation.",
    github: "https://github.com/laninh-tech/Smart-Recommendation-System",
  },
  {
    category: "Machine Learning/Deep Learning",
    name: "Vietnamese Sentiment Analysis System",
    subtitle: "Vietnamese NLP pipeline for sentiment and order-intent extraction",
    date: "Jul 2025",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&fm=webp&q=80&w=800",
    tags: ["Python", "PyTorch", "Transformers", "Streamlit", "Selenium"],
    solution:
      "Xử lý bài toán NLP tiếng Việt gồm sentiment classification và order-intent extraction từ dữ liệu văn bản không cấu trúc.",
    tech:
      "Theo README: Pandas cho tiền xử lý, PyTorch + Transformers cho mô hình, Selenium + BeautifulSoup cho thu thập dữ liệu và Streamlit cho dashboard phân tích.",
    result:
      "Giảm nỗ lực lọc bình luận thủ công và xây dựng được pipeline NLP có thể tái sử dụng cho các kịch bản phân tích phản hồi khách hàng.",
    github: "https://github.com/laninh-tech/Vietnamese-Sentiment-Analysis-System",
  },
];

const projectContentEn: Record<string, { solution: string; tech: string; result: string }> = {
  "https://github.com/laninh-tech/AI-Engineer-Portfolio": {
    solution:
      "Build a personal portfolio website as a single entry point to present selected AI/Data projects to recruiters and collaborators.",
    tech:
      "React, TypeScript, Vite, Tailwind CSS, Motion, and a GitHub Pages workflow for static deployment.",
    result:
      "Provides a stable, responsive, and easy-to-update online portfolio that stays aligned with related GitHub projects.",
  },
  "https://github.com/laninh-tech/Diabetes-Health-Risk-Analysis": {
    solution:
      "Analyze CDC BRFSS data to identify key diabetes risk factors and build a reusable health-risk classification workflow.",
    tech:
      "Python (Pandas, NumPy) for data processing, Scikit-learn models (Logistic Regression/Naive Bayes/Decision Tree), and Matplotlib/Seaborn for visualization.",
    result:
      "Highlights impactful variables and delivers a reproducible analytics pipeline for healthcare-focused data science use cases.",
  },
  "https://github.com/laninh-tech/Edge-AI-Security-Monitoring-System": {
    solution:
      "Address real-time security monitoring with object detection on video streams plus a dashboard for event and telemetry tracking.",
    tech:
      "YOLOv8 + OpenCV for CV inference, Python service backend, and React/TypeScript/Vite frontend in a local multi-service setup.",
    result:
      "Delivers an end-to-end edge AI prototype that demonstrates practical model-to-product integration.",
  },
  "https://github.com/laninh-tech/Game-AB-Testing-Analysis": {
    solution:
      "Run A/B experiment analysis for product scenarios, comparing control/treatment groups and interpreting impact on retention behavior.",
    tech:
      "Workflow includes data validation, group comparison, significance testing, and visual reporting to support product decisions.",
    result:
      "Provides a reusable A/B analysis template and translates statistical output into actionable business recommendations.",
  },
  "https://github.com/laninh-tech/Interactive-Gift-Landing-Page": {
    solution:
      "Build an interactive campaign landing page template centered on visual storytelling and quick reuse across seasonal promotions.",
    tech:
      "HTML, CSS, JavaScript with lightweight interactive animation patterns optimized for static hosting and fast deployment.",
    result:
      "Creates a reusable microsite template that showcases concise but engaging frontend implementation skills.",
  },
  "https://github.com/laninh-tech/Smart-Recommendation-System": {
    solution:
      "Solve recommendation from training to serving in one system, supported by a dashboard for behavior and recommendation quality.",
    tech:
      "Python data pipeline, deep-learning ranking models, inference backend service, React/TypeScript dashboard, Docker/Compose deployment.",
    result:
      "Establishes a complete train-to-serve workflow and a strong base for experiment tracking and model versioning.",
  },
  "https://github.com/laninh-tech/Vietnamese-Sentiment-Analysis-System": {
    solution:
      "Handle Vietnamese NLP tasks for sentiment classification and order-intent extraction from unstructured text.",
    tech:
      "Pandas preprocessing, PyTorch + Transformers modeling, Selenium + BeautifulSoup data collection, and Streamlit analytics dashboard.",
    result:
      "Reduces manual comment filtering effort and provides a reusable NLP pipeline for customer feedback analysis.",
  },
};

export const getLocalizedProjectContent = (project: Project, lang: Language) => {
  if (lang === "en") {
    return projectContentEn[project.github] || {
      solution: project.solution,
      tech: project.tech,
      result: project.result,
    };
  }

  return {
    solution: project.solution,
    tech: project.tech,
    result: project.result,
  };
};
