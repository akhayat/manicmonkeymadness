/**
 * The M3 servlet accepts all http requests, processes them and serves a response.
 */
package manicmonkeymadness;

import java.io.IOException;
import java.util.List;
import javax.servlet.http.*;
import java.util.Date;
import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import org.json.simple.*;

@SuppressWarnings("serial")
public class M3Servlet extends HttpServlet {
    public void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws IOException {

        // Get command and send request to the appropriate handler
        String command = req.getParameter("cmd");
        if (command != null && command.length() != 0) {

            if (command.equalsIgnoreCase("high_scores")) {
                handleGetHighScores(req, resp);
            } else if (command.equalsIgnoreCase("save_high_score")) {
                handleSaveHighScore(req, resp);
            } else if (command.equalsIgnoreCase("check_high_score")) {
                handleCheckHighScore(req, resp);
            }

        } else {
            // No command so write an empty response
            writeEmptyResponse(resp);
        }
    }

    /*
     * Handles a request to get the high scores for all game modes
     */
    @SuppressWarnings("unchecked")
    private void handleGetHighScores(HttpServletRequest req, HttpServletResponse resp)
             throws IOException	{

        JSONObject highScores = new JSONObject();

        // Setup the query
        PersistenceManager pm = M3PersistenceManagerFactory.get().getPersistenceManager();
        Query query = pm.newQuery(M3HighScore.class);
        query.setFilter("game == gameModeParam");
        query.setOrdering("score DESC");
        query.declareParameters("String gameModeParam");

        // Get each game mode's high scores
        List<M3HighScore> lastMonkeyStanding = (List<M3HighScore>) query.execute("last_monkey_standing");
        JSONArray lmsScores = new JSONArray();
        for (M3HighScore hs : lastMonkeyStanding) {
            JSONObject score = new JSONObject();
            score.put("name", hs.getName());
            score.put("score", hs.getScore());
            lmsScores.add(score);

            if (lmsScores.size() > 9) break;
        }
        highScores.put("Last Monkey Standing", lmsScores);

        List<M3HighScore> demoderby3 = (List<M3HighScore>) query.execute("demolition_derby_3");
        JSONArray dd3Scores = new JSONArray();
        for (M3HighScore hs : demoderby3) {
            JSONObject score = new JSONObject();
            score.put("name", hs.getName());
            score.put("score", hs.getScore());
            dd3Scores.add(score);

            if (dd3Scores.size() > 9) break;
        }
        highScores.put("Demolition Derby 3", dd3Scores);

        List<M3HighScore> demoderby5 = (List<M3HighScore>) query.execute("demolition_derby_5");
        JSONArray dd5Scores = new JSONArray();
        for (M3HighScore hs : demoderby5) {
            JSONObject score = new JSONObject();
            score.put("name", hs.getName());
            score.put("score", hs.getScore());
            dd5Scores.add(score);

            if (dd5Scores.size() > 9) break;
        }
        highScores.put("Demolition Derby 5", dd5Scores);

        List<M3HighScore> demoderby10 = (List<M3HighScore>) query.execute("demolition_derby_10");
        JSONArray dd10Scores = new JSONArray();
        for (M3HighScore hs : demoderby10) {
            JSONObject score = new JSONObject();
            score.put("name", hs.getName());
            score.put("score", hs.getScore());
            dd10Scores.add(score);

            if (dd10Scores.size() > 9) break;
        }
        highScores.put("Demolition Derby 10", dd10Scores);

        query.closeAll();
        pm.close();

        writeJsonResponse(resp, highScores);
    }

    /*
     * Handles a request to save a new high score and show the new resulting high scores
     */
    private void handleSaveHighScore(HttpServletRequest req, HttpServletResponse resp)
             throws IOException	{

        // Get the parameters
        String name = req.getParameter("name");
        String game = req.getParameter("game");
        int score = Integer.valueOf(req.getParameter("score"));

        // Create new high score
        M3HighScore highScore = new M3HighScore(name, score, new Date(), game);

        // Save new high score
        boolean success = save(highScore);

        if (success) {
            // Get the high scores with the new score
            handleGetHighScores(req, resp);
        } else {
            writeResponse(resp, "fail");
        }
    }

    /*
     * Handles a request to see if a new high score has been achieved
     */
    private void handleCheckHighScore(HttpServletRequest req, HttpServletResponse resp)
             throws IOException	{

        int score = Integer.valueOf(req.getParameter("score"));
        String game = req.getParameter("game");

        // Setup the query
        PersistenceManager pm = M3PersistenceManagerFactory.get().getPersistenceManager();
        Query query = pm.newQuery(M3HighScore.class);
        query.setFilter("game == gameModeParam");
        query.setOrdering("score DESC");
        query.declareParameters("String gameModeParam");

        // Get the played game mode's high scores
        List<M3HighScore> highScores = (List<M3HighScore>) query.execute(game);

        boolean newHighScore = false;
        if (highScores.size() < 10) {
            newHighScore = true;
        } else {
            highScores = highScores.subList(0, 10);

            for (M3HighScore hs : highScores) {
                if (score > hs.getScore()) {
                    newHighScore = true;
                    break;
                }
            }
        }

        query.closeAll();
        pm.close();

        if (newHighScore) {
            writeResponse(resp, "true");
        } else {
            writeResponse(resp, "false");

        }
    }

    private boolean save(Object entity) {
        PersistenceManager pm = M3PersistenceManagerFactory.get().getPersistenceManager();

        try {
            pm.makePersistent(entity);
        } catch(Exception e) {
            return false;
        } finally {
            pm.close();
        }
        return true;
    }

    private void writeResponse(HttpServletResponse resp, String response)
            throws IOException {
        resp.setContentType("text/plain");
        resp.getWriter().write(response);
    }
    private void writeJsonResponse(HttpServletResponse resp, Object jsonObject)
              throws IOException {
        resp.setContentType("application/json");
        resp.getWriter().println(jsonObject);
    }

    private void writeEmptyResponse(HttpServletResponse resp)
            throws IOException {
        resp.setContentType("text/plain");
        resp.getWriter().write("");
    }
}
