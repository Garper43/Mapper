import org.apache.catalina.servlets.DefaultServlet;

import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.nio.charset.StandardCharsets;

public class MapperServlet extends HttpServlet {
    private final String APP_DIR = "webapps/Mapper/";

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        DefaultServlet ds = new DefaultServlet();
        ds.service(request, response);
        
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
