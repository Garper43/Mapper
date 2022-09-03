import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.nio.charset.StandardCharsets;

public class MapperServlet extends HttpServlet {
    private final String APP_DIR = "webapps/Mapper/";

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) {
        try {
            response.setContentType("text/html");
            PrintWriter out = response.getWriter();
            out.println("<html><body>");
            out.println("<h1>Hello Worlddddd plz run</h1>");
            out.println("</body></html>");
        } catch(Exception e) {

        }
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) {
        ServletContext context = getServletContext();
        try {
            PrintWriter out = response.getWriter();
            out.println("Hello");

            response.setStatus(201);
            File file = new File(APP_DIR + "file.txt");
            file.createNewFile();

            FileWriter fw = new FileWriter(file, true);
            String text = new String(request.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
            fw.write(text);
            fw.flush();
            fw.close();

            context.log("success");
        } catch(Exception e) {
            context.log("error", e);
        }
    }
}
