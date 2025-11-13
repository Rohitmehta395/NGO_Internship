const Features = () => {
  const featuresList = [
    { title: "Education", description: "Fermentum nisi accumsan nisi sap..." },
    { title: "AI Translator", description: "Ultricies lacus turpis proin tempor fauci..." },
    { title: "Certificate", description: "Adipiscing in vitae nec posse eget frin..." },
    { title: "Mentorships", description: "Nunc tristique quis len dus gravida voi..." },
  ];

  return (
          <section className="w-full px-0 sm:px-12 lg:px-[150px] py-12 lg:py-[60px] bg-[#F8F9FA]">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Education */}
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M7.03125 12.6563H1.40625V43.7813H14.3038C16.8505 43.7813 19.293 44.7929 21.0937 46.5938H26.9062C28.707 44.7929 31.1495 43.7813 33.6962 43.7813H46.5937V15.4688H40.9687" stroke="#FD7E14" strokeWidth="2" strokeMiterlimit="10"/>
                <path d="M24 12.6563H24.8813C27.4406 10.828 30.4782 9.84375 33.6843 9.84375H40.9687V38.1563H33.6843C30.4782 38.1563 27.4406 39.1405 24.8813 40.9688H23.1187C20.5594 39.1405 17.5218 38.1563 14.3157 38.1563H7.03125V7.03125H12.6562" stroke="#FD7E14" strokeWidth="2" strokeMiterlimit="10"/>
                <path d="M12.6562 1.40625V29.7188C18.8695 29.7188 24 34.7555 24 40.9688V12.6563C24 6.44297 18.8695 1.40625 12.6562 1.40625Z" stroke="#FD7E14" strokeWidth="2" strokeMiterlimit="10"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-teachers font-bold text-2xl text-black mb-3">Spoken English</h3>
              <p className="font-inter text-base leading-6 text-black/60 line-clamp-2">
               Develop confident, conversational English.
              </p>
            </div>
          </div>

          {/* AI Translator */}
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <svg width="48" height="48" viewBox="0 0 45 45" fill="none">
                <path d="M22.5 37.5H30M22.5 37.5H15M22.5 37.5V30M22.5 30H9.375C8.33947 30 7.5 29.1605 7.5 28.125V11.25C7.5 10.2145 8.33947 9.375 9.375 9.375H35.625C36.6605 9.375 37.5 10.2145 37.5 11.25V28.125C37.5 29.1605 36.6605 30 35.625 30H22.5Z" stroke="#FD7E14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-teachers font-bold text-2xl text-black mb-3">Digital Literacy</h3>
              <p className="font-inter text-base leading-6 text-black/60 line-clamp-2">
                Master MS Office, AI, and ChatGPT basics.
              </p>
            </div>
          </div>

          {/* Certificate */}
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M16 42H32M24 42V34M24 34C18.4772 34 14 29.5228 14 24V8H34V24C34 29.5228 29.5228 34 24 34ZM34 12H37C39.7614 12 42 14.2386 42 17C42 19.7614 39.7614 22 37 22H34M14 22H11C8.23858 22 6 19.7614 6 17C6 14.2386 8.23858 12 11 12H14" stroke="#FD7E14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-teachers font-bold text-2xl text-black mb-3">Financial Literacy</h3>
              <p className="font-inter text-base leading-6 text-black/60 line-clamp-2">
                Empowering courses on money management.
              </p>
            </div>
          </div>

          {/* Mentorships */}
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M32.8208 4.39844C29.4644 4.39844 26.3896 5.60022 24 7.59531C21.6105 5.60022 18.5356 4.39844 15.1793 4.39844C7.57256 4.39844 1.40625 10.5648 1.40625 18.1715C1.40625 21.4183 2.61019 24.3407 4.40906 26.7572C7.81866 31.3374 24 43.2581 24 43.2581C24 43.2581 40.1813 31.3374 43.5909 26.7571C45.3898 24.3406 46.5938 21.4182 46.5938 18.1714C46.5938 10.5648 40.4274 4.39844 32.8208 4.39844Z" stroke="#FD7E14" strokeWidth="2" strokeMiterlimit="10"/>
                <path d="M13.8732 22.8053C16.9703 22.8053 19.4809 20.2947 19.4809 17.1976C19.4809 14.1005 16.9703 11.5898 13.8732 11.5898C10.7761 11.5898 8.26544 14.1005 8.26544 17.1976C8.26544 20.2947 10.7761 22.8053 13.8732 22.8053Z" stroke="#FD7E14" strokeWidth="2" strokeMiterlimit="10"/>
                <path d="M20.8203 28.4957C20.1732 25.2503 17.3087 22.8047 13.8732 22.8047C9.96072 22.8047 6.78906 25.9763 6.78906 29.8888" stroke="#FD7E14" strokeWidth="2" strokeMiterlimit="10"/>
                <path d="M34.1234 22.8053C37.2204 22.8053 39.7311 20.2947 39.7311 17.1976C39.7311 14.1005 37.2204 11.5898 34.1234 11.5898C31.0263 11.5898 28.5156 14.1005 28.5156 17.1976C28.5156 20.2947 31.0263 22.8053 34.1234 22.8053Z" stroke="#FD7E14" strokeWidth="2" strokeMiterlimit="10"/>
                <path d="M27.1797 28.4958C27.8268 25.2504 30.6913 22.8047 34.1268 22.8047C38.0393 22.8047 41.211 25.9763 41.211 29.8888" stroke="#FD7E14" strokeWidth="2" strokeMiterlimit="10"/>
                <path d="M23.9981 27.7428C27.0952 27.7428 29.6059 25.2322 29.6059 22.1351C29.6059 19.038 27.0952 16.5273 23.9981 16.5273C20.9011 16.5273 18.3904 19.038 18.3904 22.1351C18.3904 25.2322 20.9011 27.7428 23.9981 27.7428Z" stroke="#FD7E14" strokeWidth="2" strokeMiterlimit="10"/>
                <path d="M31.0823 37.905V34.8263C31.0823 30.9138 27.9107 27.7422 23.9982 27.7422C20.0857 27.7422 16.9141 30.9138 16.9141 34.8263V37.905" stroke="#FD7E14" strokeWidth="2" strokeMiterlimit="10"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-teachers font-bold text-2xl text-black mb-3">Mentorship Program</h3>
              <p className="font-inter text-base leading-6 text-black/60 line-clamp-2">
                Guidance from experts on soft skills.
              </p>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Features;