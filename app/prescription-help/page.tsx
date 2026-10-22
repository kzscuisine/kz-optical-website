export const metadata = { title: "Prescription Help", description: "How to read your prescription and upload it when ordering.", alternates: { canonical: "/prescription-help" } };
export default function Page() {
  return (
    <main className="page narrow">
      <div className="pagehead">
        <small>CUSTOMER INFORMATION</small>
        <h1>Prescription Help</h1>
        <p>Last updated: October 20, 2026</p>
      </div>
      <div className="prose">
        <p>To make your glasses we need a current prescription from a licensed optometrist or ophthalmologist. We do not provide eye exams.</p>

        <h2>What we need</h2>
        <ul>
          <li><b>OD</b> is your right eye and <b>OS</b> is your left eye.</li>
          <li><b>SPH</b> (sphere) is the main lens power. A minus sign means short-sighted and a plus sign means long-sighted.</li>
          <li><b>CYL</b> (cylinder) and <b>AXIS</b> correct astigmatism. If your prescription has no CYL or AXIS, leave them at 0.</li>
          <li><b>ADD</b> is the extra reading power used for progressive and bifocal lenses. For single vision lenses leave it at 0.</li>
          <li><b>PD</b> (pupillary distance) is the distance between your pupils in millimetres. It is often on your prescription. If it is not, ask your optometrist or optician for it.</li>
        </ul>

        <h2>How to give us your prescription</h2>
        <p>During checkout you can type your prescription into the form and, if you like, upload a clear photo or scan of it (PDF, JPG or PNG, up to 4 MB). Uploaded files are stored privately.</p>
        <p>If you do not have your prescription to hand, you can choose to provide it after ordering. Email a photo or scan to kzdknss@gmail.com with your order number, and we will start once we have it.</p>

        <h2>Which lenses should I choose?</h2>
        <p>See our Lens Guide for an explanation of single vision, progressive and bifocal lenses, and of the lens coatings we offer.</p>

        <h2>A few tips</h2>
        <ul>
          <li>Please check the numbers you enter against your prescription before you pay.</li>
          <li>Use a current prescription. Eye care professionals usually recommend regular eye exams, so ask yours how long your prescription stays valid.</li>
          <li>If something on your prescription is unclear, ask your eye care professional, or contact us before ordering.</li>
        </ul>

        <h2>Need help?</h2>
        <p>Email kzdknss@gmail.com or call 604-765-0400, Monday to Friday, 9 am – 5 pm Pacific.</p>
      </div>
    </main>
  );
}
