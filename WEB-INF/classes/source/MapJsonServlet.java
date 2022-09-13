import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.Scanner;

public class MapJsonServlet extends HttpServlet {
    private final String MAPS_DIR = "webapps/Mapper/maps/";

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        out.println("Hello");
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) {
        ServletContext context = getServletContext();
        try {
            //read request
            Scanner scn = new Scanner(request.getInputStream());
            int mapId = scn.nextInt();
            String mapJson = scn.next();

            context.log(mapJson);

            //create/find file to save map in
            File file = new File(MAPS_DIR + mapId + ".json");
            file.createNewFile();

            //write map data to file
            FileWriter fw = new FileWriter(file, false);
            fw.write(mapJson);
            fw.close();

            //response.setStatus(201);
            context.log("success");
        } catch(Exception e) {
            context.log("error", e);
        }
    }
}
